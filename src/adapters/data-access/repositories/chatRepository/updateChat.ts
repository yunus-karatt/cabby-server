import { MessageInterface } from "../../../../business/interfaces/comman";
import Chat from "../../models/chatModel";

export default{
  updateChat:async(chatId:any,message:MessageInterface)=>{
    try {
      return await Chat.findByIdAndUpdate(chatId,{
        $push:{
          messages:message
        }
      },{new:true})
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}