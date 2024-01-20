import User from "../../models/userModel"

export default{
  blockUser:async(_id:string)=>{
    try {
      const user = await User.findById(_id);
      if(!user)
      throw new Error("no user found")
      return await User.findByIdAndUpdate(_id,{$set:{isBlocked:!user.isBlocked}})
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}