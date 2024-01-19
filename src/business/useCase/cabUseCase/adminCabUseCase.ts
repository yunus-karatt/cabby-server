import { getCabs } from "../../../adapters/data-access/repositories/cabRepository/getCab"
import saveCab from "../../../adapters/data-access/repositories/cabRepository/saveCab"
import { CabInterface } from "../../interfaces/admin"

export default{
  addCabUsecase:async(data:CabInterface)=>{
    try {
      return await saveCab.saveCab(data)
    } catch (error) {
      throw new Error ((error as Error).message)
    }
  },
  getCabsUsecase:async()=>{
    try {
      return await getCabs()
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}