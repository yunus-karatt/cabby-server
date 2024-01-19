import {  CabInterface } from "../../../../business/interfaces/admin"
import Cab from "../../models/cabModel"

export default{
  saveCab:async(data:CabInterface)=>{
    try {
      const cab=new Cab({...data})
      return await cab.save()
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}