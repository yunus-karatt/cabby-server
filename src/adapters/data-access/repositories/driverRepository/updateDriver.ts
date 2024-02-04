import { DriverDetails } from "../../../../business/interfaces/driver";
import Driver from "../../models/driverModel";


export const updateDriver={
  updateDriverDetails:async(data:DriverDetails)=>{
    try {
      console.log(data)
     return await Driver.updateOne({_id:data.id},{...data})
    } catch (error) {
      throw new Error((error as Error).message)
    }
  },
  verifyDriver:async(_id:string)=>{
    try {
      return await Driver.findByIdAndUpdate(_id,{driverVerified:true})
    } catch (error) {
      throw new Error ((error as Error).message)
    }
  },
  rejectDriver:async(_id:string,reason:string)=>{
    try {
      return await Driver.findByIdAndUpdate(_id,{driverVerified:false,rejectionReason:reason})
    } catch (error) {
      throw new Error((error as Error).message)
    }
  },
  blockDriver:async(_id:string)=>{
    try {
      const driver = await Driver.findById(_id);
      if(!driver)
      throw new Error("no user found")
      return await Driver.findByIdAndUpdate(_id,{$set:{isBlocked:!driver.isBlocked}})
    } catch (error) {
      throw new Error((error as Error).message)
    }
  },
  changeAvailability:async(_id:string)=>{
    try {
      const driver= await Driver.findById(_id)
      if(driver){
        driver.isAvailable=!driver.isAvailable
        const result= await driver.save()
        return result.isAvailable
      }
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message)
    }
  },
  postRejectionReason:async(driverId:string,rideId:string,reason:string)=>{
    try {
      return await Driver.findByIdAndUpdate(driverId,{$push:{rejectedRides:{rideId,reason}}})
    } catch (error) {
      throw new Error ((error as Error).message)
    }
  },
  setOffline:async(driverId:string)=>{
    try {
      return await Driver.findByIdAndUpdate(driverId,{isAvailable:false})
    } catch (error) {
      throw new Error((error as Error).message)
    }
  },
  setIsRiding:async(driverId:string)=>{
    try {
      return await Driver.findByIdAndUpdate(driverId,{isRiding:true})
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}