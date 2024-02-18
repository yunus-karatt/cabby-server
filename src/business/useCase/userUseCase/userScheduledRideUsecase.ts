import getScheduledRide from "../../../adapters/data-access/repositories/scheduledRideRepository/getScheduledRide"

export default{
  getScheduledRideByUserId:async(userId:string)=>{
    try {
      return await getScheduledRide.getScheduledRideByUserid(userId)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  } 
}