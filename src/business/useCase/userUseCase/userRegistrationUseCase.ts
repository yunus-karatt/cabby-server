import { getUser } from "../../../adapters/data-access/repositories/userRepository/getUser";
import {saveUser} from "../../../adapters/data-access/repositories/userRepository/saveUser";
import { handleError } from "../../errors/errorHandling";
import { signupData } from "../../interfaces/comman";


export default {
  registerUser: async (data:signupData)=>{
  try {
     const savedUser=await saveUser(data)
     const user={
      _id:savedUser._id,
      firstName:savedUser.firstName,
      lastName:savedUser.lastName,
      mobile:savedUser.mobile
     }
     return user
     
    } catch (error) {
      handleError(error as Error)
    }
  },
  checkUserExist:async (mobile:{number:string})=>{
    try {
      const existingUser=await getUser.getUserWithMobile(mobile)
      if(existingUser){
        return existingUser
      }else{
        return null
      }
    } catch (error) {
      
    }
  }
}