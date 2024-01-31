import { getUser } from "../../../adapters/data-access/repositories/userRepository/getUser"

export default{
  getUserInfobyId:async(id:string)=>{
    try {
      const user=await getUser.getUserWithId(id)
      return {firstName:user?.firstName,lastName:user?.lastName}
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}