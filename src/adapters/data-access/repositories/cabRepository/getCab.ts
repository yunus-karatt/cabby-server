import Cab from "../../models/cabModel"

export const getCabs=async()=>{
  try {
    return await Cab.find()
  } catch (error) {
    throw new Error ((error as Error).message)
  }
}

export const getCabTypes=async()=>{
  try {
    return await Cab.find({},{cabType:1,maxPersons:1})
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
