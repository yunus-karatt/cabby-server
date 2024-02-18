import ScheduledRide from "../../models/scheduledRideModel"

export default{
  updateWithDriverId:async(rideId:string,driverId:string)=>{
    try {
      return await ScheduledRide.findByIdAndUpdate(rideId,{driverId})
    } catch (error) {
      throw new Error ((error as Error).message)
    }
  },
  updateOTP:async (rideId:string,OTP:number)=>{
    try {
      return await ScheduledRide.findByIdAndUpdate(rideId,{otp:OTP})
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}