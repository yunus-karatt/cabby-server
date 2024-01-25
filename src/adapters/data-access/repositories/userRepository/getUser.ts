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
  },
  getAllUserWithLimit:async(skip:number,limit:number)=>{
    try {
      return await User.find().skip((skip-1)*limit).limit(limit)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  },
  getUserCount:async()=>{
    try {
      return await User.find().countDocuments()
    } catch (error) {
      throw new Error((error as Error).message)
    }
  },
  getUserBySearch:async(query:string,page:number)=>{
    try {
      const regexQuery={$or:[
        {firstName:{$regex:new RegExp(query,'i')}},
        {lastName:{$regex:new RegExp(query,'i')}}
      ]}
      const count=await User.find(regexQuery).countDocuments()
      const user=await User.find(regexQuery).skip((page-1)*10).limit(10)
      return {count,user}
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
};
