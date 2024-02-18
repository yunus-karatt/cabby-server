import { Server, Socket } from "socket.io";
import driverRideUsecase from "../../business/useCase/driverUseCase/driverRideUsecase";
import {
  QuickRideInterface,
  ScheduledRideInterface,
} from "../../business/interfaces/driver";
import { getQuickRide } from "../../adapters/data-access/repositories/quickRideRepository/getQuickRide";
import EventEmitter from "events";
import { updateQuickRideStatus } from "../../adapters/data-access/repositories/quickRideRepository/updateQuickRise";
import { updateDriver } from "../../adapters/data-access/repositories/driverRepository/updateDriver";
import chatUseCase from "../../business/useCase/chatUseCase/chatUseCase";
const eventEmitter=new EventEmitter()

interface RideRequestData {
  source: { latitude: number; longitude: number; placeName: string };
  destination: { latitude: number; longitude: number; placeName: string };
  duration: string;
  distance: number;
  amount?: number;
  userId: string;
}
interface NearestDrivers {
  [rideId: string]: {
    initiated?: boolean;
    drivers: { driverId: string; cabId: string }[];
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
          latitude: data.destination.latitude,
          longitude: data.destination.longitude,
        },
        destinationLocation: data.destination.placeName,
        sourceCoordinates: {
          latitude: data.source.latitude,
          longitude: data.source.longitude,
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
        latitude: data.source.latitude,
        longitude: data.source.longitude,
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
          nearestDrivers[data.rideId].drivers.push({
            driverId: data.driverId,
            cabId: data.cabId,
          });
          if (!availableCabTypes[data.rideId])
            availableCabTypes[data.rideId] = new Set();
          availableCabTypes[data.rideId].add(data.cabId);
        }
        io.emit("sendAvailableCabs", {
          cabId: [...(availableCabTypes[data.rideId] || [])],
          rideId: data.rideId,
        });
      }
    );

    socket.on("getRequestForRide", async (data) => {
      console.log("socket getRequestForRide", data);
      await driverRideUsecase.updateQuickRideData(data.rideId, {
        price: data.amount,
      });

      nearestDrivers[data.rideId].drivers = nearestDrivers[
        data.rideId
      ].drivers.filter((id) => id.cabId === data.selectedCabId);
      if (!nearestDrivers[data.rideId].initiated) {
        nearestDrivers[data.rideId].initiated = true;
        emitNearestDrivers(data.rideId);
      }
    });

    const emitNearestDrivers = async (rideId: string) => {
      if (nearestDrivers[rideId]?.drivers.length > 0) {
        const driverId = nearestDrivers[rideId].drivers.shift();
        const rideData = await getQuickRide(rideId);
        io.emit("getDriverConfirmation", {
          driverId: driverId?.driverId,
          rideData,
        });
        nearestDrivers[rideId].timeoutId = setTimeout(() => {
          handleTimeout(rideId);
        }, 15000);
      } else {
        socket.emit("noDrivers");
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
      const otp = generateOTP();
      data.otp = otp;
      await driverRideUsecase.updateQuickRideData(data._id, data);
      await driverRideUsecase.updateDriverStatus(data.driverId);
      const rideData: any =
        await driverRideUsecase.getQuickRideDataWithDriverData(data._id);
      rideData[0].driverCoordinates = data.driverCoordinates;
      io.emit("approvedRide", rideData);
    });

    socket.on("cancelRideBydriver", (data: any) => {
      console.log({ data });
    });
    socket.on("driverLiveLocation", (data) => {
      io.emit("updateDriverCoordsForDriver", data);
    });
    socket.on("driverReachedAtPickup", (data) => {
      io.emit("driverReached", data);
    });
    socket.on("otpVerified", (data: { rideId: string; userId: string }) => {
      io.emit("rideStarted", data);
    });
    socket.on("reachedDestination", async(data) => {
      console.log(data);
      await updateQuickRideStatus(data.rideId,'Ended')
      console.log("driverid",data.driverId);
      await updateDriver.setIsRidingFalse(data.driverId)
      io.emit("reachedDestination", data);
    });
    socket.on("disconnect", () => {
      console.log("disconnected", socket.id);
    });

    // scheduled Rides
    socket.on("requestScheduledRide", async (data) => {
      // saving scheduled ride to db
      const savedRide: any = await driverRideUsecase.saveScheduledRide(data);
      
      // gettin drivers without time conflict and available 
      const matchedDrivers =
        await driverRideUsecase.getMatchedDriversForScheduledRide(savedRide);
      const TIMEOUT_DURATION = 15 * 1000;
      if (matchedDrivers)
        for (const driver of matchedDrivers) {
          // Send ride request to the driver using socket
          const response: any = await sendRideRequestToDriver(
            savedRide,
            driver,
            TIMEOUT_DURATION,
          );

          // Handle driver response
          if (response.status === "ACCEPTED") {
            console.log(
              `Driver ${driver._id} accepted the ride request.`
            );
            const updatedWithDriverId=await driverRideUsecase.updateScheduledRideWithDriver(savedRide._id,response.driverId)
            console.log({updatedWithDriverId})
            break; // Exit the loop if the driver accepts the request
          } else if (response.status === "REJECTED") {
            console.log(`Driver ${driver._id} rejected the ride request.`);
            // Continue to the next driver if the current driver rejects the request
            continue;
          } else if (response === "TIMEOUT") {
            console.log(
              `Driver ${driver._id} did not respond within the timeout period.`
            );
            // Continue to the next driver if the current driver doesn't respond within the timeout period
            continue;
          }
        }
    });

    async function sendRideRequestToDriver(
      savedRide: any,
      driver: any,
      timeoutDuration: number,
    ) {
      io.emit("scheduledRideRequest", { savedRide, driver });

      return new Promise((resolve) => {
        const timeoutId = setTimeout(() => {
          resolve("TIMEOUT"); // Resolve with TIMEOUT if the timeout duration is reached
        }, timeoutDuration);

        // Listen for response from the driver
        eventEmitter.once("rideRequestResponse", (response) => {
          clearTimeout(timeoutId); // Clear the timeout
          resolve(response); // Resolve with the response from the driver
        });
      });
    }
    socket.on("scheduledRideRequestResponse", (response) => {
      
      eventEmitter.emit("rideRequestResponse", response);
    });

    socket.on('join-chat',async(data:{rideId:string,isScheduled:boolean})=>{
      // console.log({datafromjoinchat:data})
      const result=await chatUseCase.getChatByRideId(data.rideId,data.isScheduled)
      io.emit("chat-message",result?.messages,data.rideId)
    })

    socket.on('update-chat-message',async(data)=>{
      const result=await chatUseCase.updateChat(data);
      io.emit('chat-message',result?.messages,data.rideId);
    })
  });
};
