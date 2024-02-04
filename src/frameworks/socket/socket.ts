import { Server, Socket } from "socket.io";
import driverRideUsecase from "../../business/useCase/driverUseCase/driverRideUsecase";
import { QuickRideInterface } from "../../business/interfaces/driver";
import { getQuickRide } from "../../adapters/data-access/repositories/quickRideRepository/getQuickRide";

interface RideRequestData {
  source: { lat: number; long: number; placeName: string };
  destination: { lat: number; long: number; placeName: string };
  duration: string;
  distance: number;
  amount?: number;
  userId: string;
}
interface NearestDrivers {
  [rideId: string]: {
    initiated?: boolean;
    drivers: {driverId:string,cabId:string}[];
    timeoutId?: NodeJS.Timeout;
  };
}
interface AvailableCabs {
  [rideId: string]: Set<string>;
}
let nearestDrivers: NearestDrivers = {};
let availableCabTypes: AvailableCabs = {};

export const socketIOServer = (server: any) => {
  const io: Server = new Server(server, {
    cors: {
      origin: "*",
      credentials: true,
    },
  });

  io.on("connect", (socket: Socket) => {
    console.log("connected", socket.id);

    socket.on("getNearByDrivers", async (data: RideRequestData) => {
      const quickRideData: QuickRideInterface = {
        destinationCoordinates: {
          latitude: data.destination.lat,
          longitude: data.destination.long,
        },
        destinationLocation: data.destination.placeName,
        sourceCoordinates: {
          latitude: data.source.lat,
          longitude: data.source.long,
        },
        sourceLocation: data.source.placeName,
        distance: data.distance,
        userId: data.userId,
        duration: parseFloat(data.duration),
      };

      const savedRide: any = await driverRideUsecase.saveQuickRide(
        quickRideData
      );

      nearestDrivers[savedRide._id] = { drivers: [] };

      io.emit("getDriverCoordinates", {
        lat: data.source.lat,
        long: data.source.long,
        rideId: savedRide._id,
        duration: data.duration,
      });
    });

    socket.on(
      "driverDistance",
      async (data: {
        distance: number;
        driverId: string;
        cabId: string;
        rideId: string;
        duration: string;
      }) => {
        const available = await driverRideUsecase.getAvailableDrivers(
          data.driverId,
          parseFloat(data.duration)  
        );
        if (available) {
          nearestDrivers[data.rideId].drivers.push({driverId:data.driverId,cabId:data.cabId});
          if (!availableCabTypes[data.rideId])
            availableCabTypes[data.rideId] = new Set();
          availableCabTypes[data.rideId].add(data.cabId);
        }
        io.emit("sendAvailableCabs", {cabId:[...availableCabTypes[data.rideId]||[]],rideId:data.rideId});
        
      }
    );
    socket.on("getRequestForRide", async(data) => {
      console.log('socket getRequestForRide',data)
      await driverRideUsecase.updateQuickRideData(data.rideId, {price:data.amount});

      nearestDrivers[data.rideId].drivers=nearestDrivers[data.rideId].drivers.filter(id=>id.cabId===data.selectedCabId)
      if (!nearestDrivers[data.rideId].initiated) {
          nearestDrivers[data.rideId].initiated = true;
          emitNearestDrivers(data.rideId);  
        }
    });


    const emitNearestDrivers = async (rideId: string) => {
      if (nearestDrivers[rideId].drivers.length > 0) {
        const driverId = nearestDrivers[rideId].drivers.shift();
        const rideData = await getQuickRide(rideId);
        io.emit("getDriverConfirmation", { driverId:driverId?.driverId, rideData });
        nearestDrivers[rideId].timeoutId = setTimeout(() => {
          handleTimeout(rideId);
        }, 15000);
      } else {
        socket.emit("noDrivers")
      }
    }; 

    const handleTimeout = (rideId: string) => {
      console.log(`Timeout reached for ride ${rideId}`);

      if (nearestDrivers[rideId]) {
        clearTimeout(nearestDrivers[rideId].timeoutId);

        emitNearestDrivers(rideId);
      }
    };

    socket.on("rejectRide", (data) => {
      emitNearestDrivers(data._id);
    });

    socket.on("approveRide", async (data: any) => {

      nearestDrivers = {};
      const generateOTP = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
      };
      const otp=generateOTP()
      data.otp=otp
      console.log('socket update ride data',data)
      await driverRideUsecase.updateQuickRideData(data._id, data);
      await driverRideUsecase.updateDriverStatus(data.driverId)
      const rideData:any=await driverRideUsecase.getQuickRideDataWithDriverData(data._id)
      rideData[0].driverCoordinates=data.driverCoordinates
      io.emit('approvedRide',rideData)
    });
  });
};
