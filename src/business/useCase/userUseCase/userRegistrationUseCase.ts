import { Response } from "express";
import { UserDocument } from "../../../adapters/data-access/models/userModel"; 
import { getUser } from "../../../adapters/data-access/repositories/userRepository/getUser";
import { saveUser } from "../../../adapters/data-access/repositories/userRepository/saveUser";
import { handleError } from "../../errors/errorHandling";
import { signupData } from "../../interfaces/comman";
import { generateToken } from "../../shared/utilities/generateToken";

export default {
  registerUser: async (data: signupData, res: Response) => {
    try {
      const savedUser = await saveUser(data);
      const user = {
        _id: savedUser._id,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        mobile: savedUser.mobile,
      };
      if (savedUser) {
        generateToken(savedUser._id, res);
      }
      return user;
    } catch (error) {
      handleError(error as Error);
    }
  },
  checkUserExist: async (mobile: { number: string }) => {
    try {
      const existingUser: UserDocument | null = await getUser.getUserWithMobile(
        mobile
      );

      if (existingUser) {
        const user = {
          _id: existingUser._id,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          mobile: existingUser.mobile,
        };
        return user;
      } else {
        return null;
      }
    } catch (error) {}
  },
};
