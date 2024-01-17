import { Response } from "express";
import { UserDocument } from "../../../adapters/data-access/models/userModel";
import { getUser } from "../../../adapters/data-access/repositories/userRepository/getUser";
import { saveUser } from "../../../adapters/data-access/repositories/userRepository/saveUser";
import { signupData } from "../../interfaces/comman";
import { generateToken } from "../../shared/utilities/generateToken";
import { ExistingUser } from "../../interfaces/user";

export default {
  registerUser: async (data: signupData) => {
    try {
      const savedUser = await saveUser(data);
      let token;
      const user = {
        _id: savedUser._id,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        mobile: savedUser.mobile,
      };
      if (savedUser) {
        token = generateToken(savedUser._id);
      }
      return { user, token };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  loginWithMobile: async (mobile: { mobile: string }) => {
    let token;
    let user;
    try {
      const existingUser: UserDocument | null = await getUser.getUserWithMobile(
        mobile
      );

      if (existingUser) {
        token = generateToken(existingUser._id);
        user = {
          _id: existingUser._id,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          mobile: existingUser.mobile,
        };
      }
      return { user, token };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  checkUserExist: async (mobile: { mobile: string }) => {
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
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  checkUserExistWithMail: async (mail: string) => {
    try {
      const existingUser: UserDocument | null = await getUser.getUserWithMail(
        mail
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
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
};
