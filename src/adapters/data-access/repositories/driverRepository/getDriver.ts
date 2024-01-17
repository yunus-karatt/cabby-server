import Driver from "../../models/driverModel"

export const getDriver={
  getDriverByMobile:async({mobile}:{mobile:string})=>{
    try {
      
      return await Driver.findOne({mobile})
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}