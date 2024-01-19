import { signupData } from "../../../../business/interfaces/comman";
import Driver from "../../models/driverModel";

export const saveDriver = {
  registerDriver: async (data: signupData) => {
    try {
      const driver = new Driver({
        ...data,
      });
      return await driver.save();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
};
