import cron from "cron";
import { setWorkdays } from "../isDayOff/isDayOff.js";
import {
  sendHoursToManager,
  sendNoTrackedTimeAlarm,
} from "../../scripts/index.js";

async function monthlyCronTick() {
  setWorkdays();
}

async function dailyCronTick() {
  sendHoursToManager();
}

async function hourlyCronTick() {
  await sendNoTrackedTimeAlarm();
}

async function schedule() {
  const monthlyCronJob = new cron.CronJob("0 0 1 * *", monthlyCronTick);
  const dailyCronJob = new cron.CronJob("0 9 * * *", dailyCronTick);
  const hourlyCronJob = new cron.CronJob("45 10-17 * * *", hourlyCronTick);
  monthlyCronJob.start();
  dailyCronJob.start();
  hourlyCronJob.start();
}

export default { schedule };
