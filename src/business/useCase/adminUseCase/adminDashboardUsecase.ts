import { getDriver } from "../../../adapters/data-access/repositories/driverRepository/getDriver";
import {
  completedRideCount,
  getAdminGraphData,
  getCancelledRideCounts,
  getQuickRide,
  getTotalRevenue,
  quickRideHistoryForAdmin,
} from "../../../adapters/data-access/repositories/quickRideRepository/getQuickRide";
import getReview from "../../../adapters/data-access/repositories/reviewRepository/getReview";
import getScheduledRide from "../../../adapters/data-access/repositories/scheduledRideRepository/getScheduledRide";

export default {
  getDashboardCounts: async () => {
    try {
      const scheduledRideCount =
        await getScheduledRide.getCompletedScheduledRideCount();
      const quickRideCount = await completedRideCount();
      const scheduledCancelledRideCount =
        await getScheduledRide.getCancelledRide();
      const quickCancelledRideCount = await getCancelledRideCounts();
      const activeRides = await getDriver.getRidingDriversCount();
      const scheduledRevenue = await getScheduledRide.getTotalRevenue();
      const quickRevenue = await getTotalRevenue();
      const quickAdminProfit = (quickRevenue[0].revenue * 10) / 100;
      const scheduledAdminProfit =
        ((scheduledRevenue[0]?.revenue * 10) / 100) | 0;
      const totalRevenue = quickAdminProfit + scheduledAdminProfit;
      return {
        completedCount: scheduledRideCount + quickRideCount,
        cancelledCount: scheduledCancelledRideCount + quickCancelledRideCount,
        activeRides,
        totalRevenue,
      };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  getBookings: async () => {
    try {
      return await getScheduledRide.getAllScheduledRide();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  getGraphData: async () => {
    try {
      const adminGraphData = await getAdminGraphData();
      const scheduledGraphData =
        await getScheduledRide.getScheduledRideGraphForAdmin();

      const totalDriversCount = await getDriver.getDriverCount();
      const ridingDrivers = await getDriver.getRidingDriversCount();
      const activeDrivers = await getDriver.getAvailableDriversCount();

      // Calculate the count of offline drivers
      const offlineDriversCount =
        totalDriversCount - ridingDrivers - activeDrivers;

      // Calculate percentages
      const ridingDriversPercentage = (
        (ridingDrivers / totalDriversCount) *
        100
      ).toFixed(2);
      const activeDriversPercentage = (
        (activeDrivers / totalDriversCount) *
        100
      ).toFixed(2);
      const offlineDriversPercentage = (
        (offlineDriversCount / totalDriversCount) *
        100
      ).toFixed(2);

      return {
        adminGraphData,
        scheduledGraphData,
        percentages: {
          ridingDriversPercentage,
          activeDriversPercentage,
          offlineDriversPercentage,
        },
      };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  getReportData: async () => {
    try {
      const scheduledReport =
        await getScheduledRide.getScheduledRideHistoryForAdmin();
      const quickReport = await quickRideHistoryForAdmin();
      return [...quickReport, ...scheduledReport];
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  getFeedbacks: async () => {
    try {
      return getReview.getAllreview();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
};
