import QuickRide from "../../models/quickRideModel"

export const updateQuickeRide=async(id:string,data:any)=>{
  try {
    return await QuickRide.updateOne({_id:id},{$set:{...data,status:"Started"}})
  } catch (error) {
    throw new Error ((error as Error).message)
  }
}