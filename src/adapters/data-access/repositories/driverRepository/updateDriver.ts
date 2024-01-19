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
  }
}