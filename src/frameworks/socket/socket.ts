import { Server, Socket } from "socket.io";
import driverRideUsecase from "../../business/useCase/driverUseCase/driverRideUsecase";
import { QuickRideInterface } from "../../business/interfaces/driver";
import { getQuickRide } from "../../adapters/data-access/repositories/quickRideRepository/getQuickRide";

interface RideRequestData {
  source: { lat: number; long: number; placeName: string };
  destination: { lat: number; long: number; placeName: string };
  selectedCabId: string;
  duration: string;
  distance: number;
  amount: number;
  userId: string;
}
interface NearestDrivers {
  [rideId: string]: {
    initiated?: boolean;
    drivers: string[];
    timeoutId?: NodeJS.Timeout;
  };
}
let nearestDrivers: NearestDrivers = {};

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
        price: data.amount,
        duration: parseFloat(data.duration),
      };

      const savedRide: any = await driverRideUsecase.saveQuickRide(
        quickRideData
      );

      nearestDrivers[savedRide._id] = { drivers: [] };

      io.emit("getDriverCoordinates", {
        lat: data.source.lat,
        long: data.source.long,
        cabId: data.selectedCabId,
        rideId: savedRide._id,
        duration: data.duration,
      });
    });

    socket.on(
      "driverDistance",
      async (data: {
        distance: number;
        driverId: string;
        rideId: string;
        duration: string;
      }) => {
        const available = await driverRideUsecase.getAvailableDrivers(
          data.driverId,
          parseFloat(data.duration)
        );
        if (available) {
          nearestDrivers[data.rideId].drivers.push(data.driverId);
        }
        if (!nearestDrivers[data.rideId].initiated) {
          nearestDrivers[data.rideId].initiated = true;
          emitNearestDrivers(data.rideId);
        }
      }
    );

    const emitNearestDrivers = async (rideId: string) => {

      if (nearestDrivers[rideId].drivers.length > 0) {
       
        const driverId = nearestDrivers[rideId].drivers.shift();
        const rideData = await getQuickRide(rideId);
        
        io.emit("getDriverConfirmation", { driverId, rideData });
        nearestDrivers[rideId].timeoutId = setTimeout(() => {
          handleTimeout(rideId);
        }, 15000);
      } else {
        console.log("no drivers left");
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
      await driverRideUsecase.updateQuickRideData(data._id, data);
    });
  });
};
