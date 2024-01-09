import User from "../../models/userModel";
import { signupData } from "../../../../business/interfaces/comman";

export const saveUser = async (data: signupData) => {
  try {
    const user = new User({
      ...data,
    });
    return await user.save();
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
