import {
  ScheduledRideInterface,
} from "../../../../business/interfaces/driver";
import ScheduledRide from "../../models/scheduledRideModel";

export const saveScheduledRide = async (data: ScheduledRideInterface) => {
  try {
    console.log({data})
    const pickUpDate = new Date(data.pickUpDate).toISOString();

    const scheduledRide = new ScheduledRide({ ...data,pickUpDate });
    return await scheduledRide.save();
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
