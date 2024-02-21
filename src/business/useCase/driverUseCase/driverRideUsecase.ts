import { getDriver } from "../../../adapters/data-access/repositories/driverRepository/getDriver";
import { updateDriver } from "../../../adapters/data-access/repositories/driverRepository/updateDriver";
import {
  completedRideCountForDriver,
  getQuickRide,
  getQuickRideWithDriver,
  isValidOTP,
} from "../../../adapters/data-access/repositories/quickRideRepository/getQuickRide";
import { saveQuickRide } from "../../../adapters/data-access/repositories/quickRideRepository/saveQuickRide";
import {
  updateQuickRideStatus,
  updateQuickeRide,
} from "../../../adapters/data-access/repositories/quickRideRepository/updateQuickRise";
import getScheduledRide from "../../../adapters/data-access/repositories/scheduledRideRepository/getScheduledRide";
import { saveScheduledRide } from "../../../adapters/data-access/repositories/scheduledRideRepository/saveScheduledRide";
import updateScheduledRide from "../../../adapters/data-access/repositories/scheduledRideRepository/updateScheduledRide";
import {
  QuickRideInterface,
  ScheduledRideInterface,
} from "../../interfaces/driver";

export default {
  getAvailableDrivers: async (id: string, duration: number) => {
    // console.log('driverid',id)
    const driver = await getDriver.getDriverById(id);

    // if(driver?.isRiding){
    //   return false
    // }
    if (!driver?.isAvailable) {
      return false;
    }
    return true;
  },
  saveQuickRide: async (data: QuickRideInterface) => {
    try {
      return await saveQuickRide(data);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  getQuickRideData: async (id: string) => {
    try {
      return await getQuickRide(id);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  updateQuickRideData: async (id: string, data: any) => {
    try {
      return await updateQuickeRide(id, data);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  postRejectionReasonUsecase: async ({
    driverId,
    rideId,
    reason,
  }: {
    driverId: string;
    rideId: string;
    reason: string;
  }) => {
    try {
      return await updateDriver.postRejectionReason(driverId, rideId, reason);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  setOfflineUseCase: async (driverId: string) => {
    try {
      return await updateDriver.setOffline(driverId);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  updateDriverStatus: async (driverId: string) => {
    try {
      return await updateDriver.setIsRiding(driverId);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  getQuickRideDataWithDriverData: async (rideId: string) => {
    try {
      return await getQuickRideWithDriver(rideId);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  verifyOTPUseCase: async (rideId: string, OTP: number) => {
    try {
      return await isValidOTP(rideId, OTP);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  saveScheduledRide: async (data: ScheduledRideInterface) => {
    try {
      return saveScheduledRide(data);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  getMatchedDriversForScheduledRide: async (rideData: any) => {
    try {
      const drivers: any = await getDriver.getDriverForScheduledRide(
        rideData.sourceCoordinates,
        rideData.cabId
      );
      const availableDrivers = [];
      for (const driver of drivers) {
        const scheduledRides = await getScheduledRide.getSheduledRideByDriverId(
          driver._id
        );
        const conflict = scheduledRides.some((scheduledRide) => {
          const scheduledRideEndTime = new Date(scheduledRide.pichUpDate);
          scheduledRideEndTime.setHours(
            scheduledRideEndTime.getHours() + scheduledRide.duration
          );

          return (
            scheduledRide.pickUpDate.getTime() ===
              rideData.pickUpDate.getTime() ||
            (scheduledRide.pickUpDate < rideData.pickUpDate &&
              scheduledRideEndTime > rideData.pickUpDate &&
              scheduledRideEndTime <=
                rideData.pickUpDate.getHours() + rideData.duration)
          );
        });
        if (!conflict) {
          availableDrivers.push(driver);
        }
        return availableDrivers;
      }
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  updateScheduledRideWithDriver: async (rideId: string, driverId: string) => {
    try {
      return await updateScheduledRide.updateWithDriverId(rideId, driverId);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  listScheduledRides: async (driverId: string) => {
    try {
      return await getScheduledRide.getDriversScheduledRide(driverId);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  getScheduledRideByRideId: async (rideId: string) => {
    try {
      return await getScheduledRide.getRideByRideId(rideId);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  generateScheduledRideOTP: async (rideId: string) => {
    try {
      const generateOTP = () => {
        return Math.floor(100000 + Math.random() * 900000);
      };
      const otp = generateOTP();
      return await updateScheduledRide.updateOTP(rideId, otp);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },

  
  updateDriverDataAfterRide: async (
    driverId: string,
    rideId: string,
    price: number
  ) => {
    try {
      const driverRevenue = price - (price * 10) / 100;
      await updateQuickRideStatus(rideId, "Ended");
      await updateDriver.setIsRidingFalse(driverId);
      await updateDriver.updateRevenue(driverId, driverRevenue);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
};
