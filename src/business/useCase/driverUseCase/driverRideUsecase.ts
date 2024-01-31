import { getDriver } from "../../../adapters/data-access/repositories/driverRepository/getDriver"
import { updateDriver } from "../../../adapters/data-access/repositories/driverRepository/updateDriver"
import { getQuickRide } from "../../../adapters/data-access/repositories/quickRideRepository/getQuickRide"
import { saveQuickRide } from "../../../adapters/data-access/repositories/quickRideRepository/saveQuickRide"
import { updateQuickeRide } from "../../../adapters/data-access/repositories/quickRideRepository/updateQuickRise"
import { QuickRideInterface } from "../../interfaces/driver"

export default{
  getAvailableDrivers:async(id:string,duration:number)=>{
    const driver=await getDriver.getDriverById(id)

    if(driver?.isRiding){
      return false
    }
    if(!driver?.isAvailable){
      return false
    }
    return true
  },
  saveQuickRide:async(data:QuickRideInterface)=>{
    try {
      return await saveQuickRide(data)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  },
  getQuickRideData:async(id:string)=>{
    try {
      return await getQuickRide(id)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  },
  updateQuickRideData:async(id:string,data:any)=>{
    try {
      return await updateQuickeRide(id,data)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  },
  postRejectionReasonUsecase:async({driverId,rideId,reason}:{driverId:string,rideId:string,reason:string})=>{
    try {
      return await updateDriver.postRejectionReason(driverId,rideId,reason)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  },
  setOfflineUseCase:async(driverId:string)=>{
    try {
      return await updateDriver.setOffline(driverId)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}