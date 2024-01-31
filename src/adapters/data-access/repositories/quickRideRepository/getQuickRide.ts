import QuickRide from "../../models/quickRideModel"

export const getQuickRide=async(id:string)=>{
  try {
    return await QuickRide.findById(id)
  } catch (error) {
    throw new Error((error as Error).message)
  }
}