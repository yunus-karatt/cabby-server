import Chat from "../../models/chatModel";

export default{
  getChatByRideId:async(rideId:string,isScheduled:boolean)=>{
    try {
      let response;
      if(isScheduled){
        response=await Chat.findOne({scheduledRideId:rideId})
      }else{
        
        response = await Chat.findOne({rideId})
      }
      return response
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}