import { getDriver } from "../../../adapters/data-access/repositories/driverRepository/getDriver";
import {
  completedRideCountForDriver,
  getGraphData,
} from "../../../adapters/data-access/repositories/quickRideRepository/getQuickRide";
import getScheduledRide from "../../../adapters/data-access/repositories/scheduledRideRepository/getScheduledRide";

export default {
  getDashboardData: async (driverId: string) => {
    try {
      const scheduledCount =
        await getScheduledRide.getCompletedScheduledRideCountForDriver(
          driverId
        );
      const rideCount = await completedRideCountForDriver(driverId);
      const upcomingScheduledRide =
        await getScheduledRide.getUpcomingSchedulerRideCountForDriver(driverId);
      let { revenue } = (await getDriver.getRevenue(driverId)) ?? {};
      const quickRideGraphData = await getGraphData(driverId);
      return {
        completedRide: scheduledCount + rideCount,
        upcomingScheduledRide,
        revenue,
        quickRideGraphData
      };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
};
