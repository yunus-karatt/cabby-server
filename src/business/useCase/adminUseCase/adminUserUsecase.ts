import { getUser } from "../../../adapters/data-access/repositories/userRepository/getUser"
import updateUser from "../../../adapters/data-access/repositories/userRepository/updateUser"

export default{
  getUsers:async(page:number)=>{
    try {
      const count=await getUser.getUserCount()
      const users=await getUser.getAllUserWithLimit(page,10)
      const totalPage=Math.ceil(count/10)
      return {users,totalPage}
    } catch (error) {
      throw new Error((error as Error).message)
    }
  },
  blockUser:async(id:string)=>{
    try {
      return await updateUser.blockUser(id)
    } catch (error) {
      throw new Error((error as Error).message)

    }
  },
  searchUser:async(query:string,page:number)=>{
    try {
      const {user,count}=await getUser.getUserBySearch(query,page)
      const totalPage=Math.ceil(count/10)
      return {user,totalPage}
    } catch (error) {
      throw new Error((error as Error).message)
    }

  }
}