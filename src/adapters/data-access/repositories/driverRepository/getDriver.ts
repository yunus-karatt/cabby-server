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
  }
}