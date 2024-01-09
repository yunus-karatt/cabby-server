import {saveUser} from "../../../adapters/data-access/repositories/userRepository/saveUser";
import { handleError } from "../../errors/errorHandling";
import { signupData } from "../../interfaces/comman";


export default {
  registerUser: async (data:signupData)=>{
  try {
    console.log(data)
     const savedUser=await saveUser(data)
     return true
     
    } catch (error) {
      handleError(error as Error)
    }
  }
}