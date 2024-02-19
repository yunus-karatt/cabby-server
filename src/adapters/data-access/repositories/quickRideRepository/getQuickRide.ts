import mongoose from "mongoose";
import QuickRide from "../../models/quickRideModel";

export const getQuickRide = async (id: string) => {
  try {
    return await QuickRide.findById(id);
  } catch (error) {
    throw new Error((error as Error).message);
  } 
};
export const getQuickRideWithDriver = async (id: string) => {
  try {
    // const objectId= mongoose.Types.ObjectId
    const rideData = await QuickRide.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
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
    return rideData;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const isValidOTP = async (rideId: string, OTP: number) => {
  try {
    const rideData = await QuickRide.findById(rideId);
    if (rideData)
      if (rideData.otp === OTP) return true;
      else return false;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
