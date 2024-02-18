import cron from "node-cron";
import getScheduledRide from "../../adapters/data-access/repositories/scheduledRideRepository/getScheduledRide";
import nodeMailer from "../../adapters/externalServices/nodeMailer";
import { getUser } from "../../adapters/data-access/repositories/userRepository/getUser";

export async function startReminderCronJob() {
  cron.schedule("*/10 * * * *", async () => {
    const currentTime = new Date();

    const pickupTime = new Date(currentTime.getTime() + 10 * 60000);
    const rides = await getScheduledRide.getScheduledRidesWithinTenMints(
      pickupTime
    );
    if (rides)
      for (const data of rides) {
        const user = await getUser.getUserWithId(data.userId);
        const info = {
          to: user?.email,
          subject: "Pickup Reminder",
          message: "Your pickup time is in 10 minutes. Please be ready!",
        };

        await nodeMailer.scheduledRideReminder(info);
      }
  });
}
