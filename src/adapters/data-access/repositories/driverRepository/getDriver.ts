import Driver from "../../models/driverModel"

export const getDriver={
  getDriverByMobile:async({mobile}:{mobile:string})=>{
    try {
      
      return await Driver.findOne({mobile})
    } catch (error) {
      throw new Error((error as Error).message)
    }
  },
  getDriverByMail:async(mail:string)=>{
    try {
      return await Driver.findOne({email:mail})
    } catch (error) {
      throw new Error((error as Error).message)
    }
  },
  getNotApprovedDrivers:async()=>{
    try {
      return await Driver.aggregate([{
        $match:{driverVerified:false,rejectionReason:null}
      },
      {
        $lookup:{
          from:"cabs",
          localField:"cabModel",
          foreignField:"_id",
          as:"cabModel"
        }
      },
      {
        $sort:{joinedAt:1}
      }
    ])
    // return await Driver.find({driverVerified:false}).populate("cabModel")
    } catch (error) {
      throw new Error((error as Error).message)
    }
  },
  getAlldrivers:async(skip:number,limit:number)=>{
    try {
      // return await Driver.find({}).skip((skip-1)*limit).limit(limit)
      return await Driver.aggregate([{
        $match:{driverVerified:true}
      },
      {
        $lookup:{
          from:"cabs",
          localField:"cabModel",
          foreignField:"_id",
          as:"cabModel"
        }
      },
      {
        $sort:{joinedAt:1}
      },
      {
        $skip: (skip - 1) * limit
      },
      {
        $limit: limit
      }
    ])
    } catch (error) {
      throw new Error((error as Error).message)
    }
  },
  getDriverCount:async()=>{
    try {
      return await Driver.find().countDocuments()
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}