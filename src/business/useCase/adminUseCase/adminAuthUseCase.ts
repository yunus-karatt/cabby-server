import { AdminDocument } from "../../../adapters/data-access/models/adminModel";
import { getAdmin } from "../../../adapters/data-access/repositories/adminRepository/getAdmin";
import { saveAdmin } from "../../../adapters/data-access/repositories/adminRepository/saveAdmin";
import { generateToken } from "../../shared/utilities/generateToken";

export default {
  registerAdmin: async (data: AdminDocument) => {
    try {
      const savedAdmin = await saveAdmin(data);
      return savedAdmin;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  isAdminExist: async (mobile: { mobile: string }) => {
    try {
      const data = await getAdmin.getAdminWithMobile(mobile);
      const admin={
        name:data?.name,
        mobile:data?.mobile,
        id:data?._id
      }
      return admin;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  loginWithMobile: async (mobile: { mobile: string }) => {
    let token;
    try {
      const admin = await getAdmin.getAdminWithMobile(mobile);
      if (admin) {
        token = generateToken(admin._id);
      }
      return { admin, token };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
};
