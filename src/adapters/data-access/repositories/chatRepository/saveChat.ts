import { ChatInterface } from "../../../../business/interfaces/comman";
import Chat from "../../models/chatModel";

export default{
  createNewChat:async(data:ChatInterface)=>{
    try {
      let chat;
      if(data.isScheduled){
        chat=new Chat({
          scheduledRideId:data.rideId,
          messages:data.message
        })
      }else{
        chat=new Chat({
          rideId:data.rideId,
          messages:data.message
        })
      }
      const result=await chat.save()
      return result
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}