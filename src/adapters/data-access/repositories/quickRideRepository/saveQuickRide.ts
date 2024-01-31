import { QuickRideInterface } from "../../../../business/interfaces/driver";
import QuickRide from "../../models/quickRideModel";

export const saveQuickRide = async (data: QuickRideInterface) => {
  try {
    const quickRide = new QuickRide({ ...data });
    return await quickRide.save();
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
