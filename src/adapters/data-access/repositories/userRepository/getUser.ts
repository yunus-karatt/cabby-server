import User from "../../models/userModel";

export const getUser = {
  getUserWithMobile: async ({ mobile }: { mobile: string }) => {
    try {
      return await User.findOne({ mobile });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  getUserWithMail:async(mail:string)=>{
    try {
      return await User.findOne({email:mail})
    } catch (error) {
      throw new Error((error as Error).message)
    }
  },
  getUserWithId:async(id:string)=>{
    try {
      return await User.findOne({_id:id})
    } catch (error) {
      console.log(error)
    }
  }
};
