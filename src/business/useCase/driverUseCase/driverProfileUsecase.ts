import { updateDriver } from "../../../adapters/data-access/repositories/driverRepository/updateDriver"

export default{
  changeAvailability:async(id:string)=>{
    try {
      return updateDriver.changeAvailability(id)
    } catch (error) {
      
      throw new Error((error as Error).message)
    }
  }
}