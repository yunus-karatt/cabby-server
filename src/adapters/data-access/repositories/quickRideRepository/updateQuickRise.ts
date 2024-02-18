import QuickRide from "../../models/quickRideModel"

export const updateQuickeRide=async(id:string,data:any)=>{
  try {
    return await QuickRide.updateOne({_id:id},{$set:{...data,status:"Started"}})
  } catch (error) {
    throw new Error ((error as Error).message)
  }
}

export const updateQuickRideStatus=async(id:string,status:string)=>{
  try {
    return await QuickRide.updateOne({_id:id},{$set:{status}})
  } catch (error) {
    throw new Error ((error as Error).message)
  }
}