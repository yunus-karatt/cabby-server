import { getCabTypes } from "../../../adapters/data-access/repositories/cabRepository/getCab"

export default{
  getCabs:async()=>{
    try {
        const cabs=await getCabTypes()
        return cabs
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}