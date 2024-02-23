import mongoose from "mongoose";
import ScheduledRide from "../../models/scheduledRideModel";

export default {
  getSheduledRideByDriverId: async (driverId: string) => {
    try {
      return await ScheduledRide.find({ driverId, status: { $ne: "Ended" } });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  getScheduledRidesWithinTenMints: async (pickupTime: Date) => {
    try {
      const now = new Date();
      return await ScheduledRide.find({
        pickUpDate: {
          $gt: now,
          $lte: pickupTime,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
  getDriversScheduledRide: async (driverId: string) => {
    try {
      const currentDate = new Date();
      return await ScheduledRide.find({
        driverId,
        pickUpDate: { $gt: currentDate },
      });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  getRideByRideId: async (_id: string) => {
    try {
      return await ScheduledRide.findById(_id);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  getAllScheduledRide: async () => {
    try {
      const currentDate = new Date();
      return await ScheduledRide.find({
        pickUpDate: { $gt: currentDate },
      })
        .populate("driverId")
        .populate("userId");
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  getScheduledRideByUserid: async (userId: string) => {
    try {
      const currentDate = new Date();

      // return await ScheduledRide.find({userId,pickUpDate:{$gt:currentDate}})
      return await ScheduledRide.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
            pickUpDate: { $gt: currentDate },
          },
        },
        {
          $lookup: {
            from: "drivers",
            localField: "driverId",
            foreignField: "_id",
            as: "driverData",
          },
        },
        {
          $unwind: "$driverData",
        },
        {
          $lookup: {
            from: "cabs",
            localField: "driverData.cabModel",
            foreignField: "_id",
            as: "driverData.cabModel",
          },
        },
      ]);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  getCompletedScheduledRideCount: async () => {
    try {
      const scheduledCount = await ScheduledRide.find({
        status: "Ended",
      }).countDocuments();
      return scheduledCount;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  getCompletedScheduledRideCountForDriver: async (driverId: string) => {
    try {
      const scheduledCount = await ScheduledRide.find({
        driverId,
        status: "Ended",
      }).countDocuments();
      return scheduledCount;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  getUpcomingSchedulerRideCountForDriver: async (driverId: string) => {
    try {
      const currentDate = new Date();

      return await ScheduledRide.find({
        driverId,
        pickUpDate: { $gt: currentDate },
      }).countDocuments();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  getScheduledRideHistoryForDriver: async (driverId: string) => {
    try {
      return await ScheduledRide.find({ driverId, status: "Ended" });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  getCancelledRide: async () => {
    try {
      return await ScheduledRide.find({ status: "Cancelled" }).countDocuments();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  getTotalRevenue: async () => {
    try {
      return await ScheduledRide.aggregate([
        {
          $match: {
            status: "Ended",
          },
        },
        {
          $group: {
            _id: null,
            revnue: { $sum: "$price" },
          },
        },
      ]);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  getScheduledRideHistoryForAdmin: async () => {
    try {
      return await ScheduledRide.find({ status: "Ended" });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  getScheduledRideGraphForAdmin: async () => {
    try {
      const today = new Date();
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const data = await ScheduledRide.aggregate([
        {
          $match: {
            date: { $gte: sevenDaysAgo, $lte: today },
            status: "Ended",
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$pickUpDate" } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
        { $project: { _id: 0, date: "$_id", count: 1 } },
      ]);

      return data
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
};
