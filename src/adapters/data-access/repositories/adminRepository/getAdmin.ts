import { Admin } from "../../models/adminModel"

export const getAdmin={
  getAdminWithMobile:async({mobile}:{mobile:string})=>{
    try {
      return await Admin.findOne({mobile}).select("-password")
    } catch (error) {
      throw new Error ((error as Error).message)
    }
  }
}