import Driver from "../../models/driverModel";

export const getDriver = {
  getDriverByMobile: async ({ mobile }: { mobile: string }) => {
    try {
      return await Driver.findOne({ mobile });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  getDriverByMail: async (mail: string) => {
    try {
      return await Driver.findOne({ email: mail });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  getNotApprovedDrivers: async () => {
    try {
      return await Driver.aggregate([
        {
          $match: { driverVerified: false, rejectionReason: null },
        },
        {
          $lookup: {
            from: "cabs",
            localField: "cabModel",
            foreignField: "_id",
            as: "cabModel",
          },
        },
        {
          $sort: { joinedAt: 1 },
        },
      ]);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  getAlldrivers: async (skip: number, limit: number) => {
    try {
      return await Driver.aggregate([
        {
          $match: { driverVerified: true },
        },
        {
          $lookup: {
            from: "cabs",
            localField: "cabModel",
            foreignField: "_id",
            as: "cabModel",
          },
        },
        {
          $sort: { joinedAt: 1 },
        },
        {
          $skip: (skip - 1) * limit,
        },
        {
          $limit: limit,
        },
      ]);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  getDriverCount: async () => {
    try {
      return await Driver.find().countDocuments();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  getDriverBySearch: async (query: string, page: number) => {
    try {
      const regexQuery = {
        $or: [
          { firstName: { $regex: new RegExp(query, "i") } },
          { lastName: { $regex: new RegExp(query, "i") } },
        ],
      };
      const count = await Driver.find({
        driverVerified: true,
        $or: [
          { firstName: { $regex: new RegExp(query, "i") } },
          { lastName: { $regex: new RegExp(query, "i") } },
        ],
      }).countDocuments();

      const driver = await Driver.aggregate([
        {
          $match: {
            driverVerified: true,
            $or: [
              { firstName: { $regex: new RegExp(query, "i") } },
              { lastName: { $regex: new RegExp(query, "i") } },
            ],
          },
        },
        {
          $lookup: {
            from: "cabs",
            localField: "cabModel",
            foreignField: "_id",
            as: "cabModel",
          },
        },
        {
          $sort: { joinedAt: 1 },
        },
        {
          $skip: (page - 1) * 10,
        },
        {
          $limit: 10,
        },
      ]);
      return { driver, count };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  getDriverById: async (id: string) => {
    try {
      return await Driver.findById(id);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  getDriverForScheduledRide: async (pickupCoors: {
    latitude: number;
    longitude: number;
  },cabId:string) => {
    try {
      const drivers =await Driver.find({
        cityCoors: {
          $nearSphere: {
            $geometry: {
              type: "Point",
              coordinates: [pickupCoors.latitude, pickupCoors.longitude], // Coordinates from which you want to find drivers
            },
            $maxDistance: 5000, // 5 km in meters
          },
        },
        isAvailable:true,
        cabModel:cabId
      },{_id:1}).exec();

      return drivers
      
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  getRevenue:async(driverId:string)=>{
    try {
      const revenue= await Driver.findById(driverId,{revenue:1,_id:0})
      console.log({revenue})
      return revenue
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
};
