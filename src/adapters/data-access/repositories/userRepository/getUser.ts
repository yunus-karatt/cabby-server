import User from "../../models/userModel";

export const getUser = {
  getUserWithMobile: async ({ number }: { number: string }) => {
    try {
      return await User.findOne({ mobile:number });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
};
