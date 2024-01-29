import { getCabs } from "../../../adapters/data-access/repositories/cabRepository/getCab"

export default{
  getCabs:async()=>{
    try {
      return await getCabs()
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}