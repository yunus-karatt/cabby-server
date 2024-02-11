import { getQuickRide } from "../../../adapters/data-access/repositories/quickRideRepository/getQuickRide"

export default{
  getQuickRideData:async(id:string)=>{
    try {
      return await getQuickRide(id)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}