import getChat from "../../../adapters/data-access/repositories/chatRepository/getChat"
import saveChat from "../../../adapters/data-access/repositories/chatRepository/saveChat"
import updateChat from "../../../adapters/data-access/repositories/chatRepository/updateChat"
import { ChatInterface } from "../../interfaces/comman"

export default{
  getChatByRideId:async(rideId:string,isScheduled:boolean)=>{
    try {
     return await getChat.getChatByRideId(rideId,isScheduled)
    } catch (error) {
      console.log(error)
    }
  },
  updateChat:async(data:ChatInterface)=>{
    try {
      const response=await getChat.getChatByRideId(data.rideId,data.isScheduled)
      if(response){
        return await updateChat.updateChat(response?._id,data.message)
      }else{
        return await saveChat.createNewChat(data)
      }
    } catch (error) {
      console.log(error)
    }
  }
}