import { getDriver } from "../../../adapters/data-access/repositories/driverRepository/getDriver"
import { updateDriver } from "../../../adapters/data-access/repositories/driverRepository/updateDriver"

export default{
  getDriverRequest:async()=>{
    try {
      return await getDriver.getNotApprovedDrivers()
    } catch (error) {
      throw new Error((error as Error).message)
    }
  },
  verifyDriver:async(id:string)=>{
    try {
      return await updateDriver.verifyDriver(id)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  },
  rejectDriver:async({id,reason}:{id:string,reason:string})=>{
    try {
      return await updateDriver.rejectDriver(id,reason)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  },
  getDrivers:async(page:number)=>{
    try {
      const count=await getDriver.getDriverCount()
      const drivers=await getDriver.getAlldrivers(page,10)
      const totalPage=Math.ceil(count/10)
      return {drivers,totalPage}
    } catch (error) {
      throw new Error((error as Error).message)
    }
  },
  blockDriver:async(id:string)=>{
    try {
      return await updateDriver.blockDriver(id)
    } catch (error) {
      throw new Error((error as Error).message)

    }
  }
}