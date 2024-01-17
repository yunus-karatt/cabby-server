import { getDriver } from "../../../adapters/data-access/repositories/driverRepository/getDriver"

export default{
  getDriverByMobile:async(mobile:{mobile:string})=>{
    try {
      const driver=await getDriver.getDriverByMobile(mobile)
      if(driver){
        return driver
      }else{
        return null
      }
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}