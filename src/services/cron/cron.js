import cron from "cron";
import { setDays } from "../isDayOff/isDayOff.js";
import { sendHoursToManager } from "../../scripts/index.js";

async function monthlyCronTick() {
  setDays();
}

async function dailyCronTick() {
  sendHoursToManager();
}

async function schedule() {
  //const monthlyCronJob = new cron.CronJob("0 0 1 * *", monthlyCronTick);
  const dailyCronJob = new cron.CronJob("0 9 * * 1-5", dailyCronTick);
  //const hourlyCronJob = new cron.CronJob("45 10-18 * * *", hourlyCronTick);
  //monthlyCronJob.start();
  dailyCronJob.start();
  //hourlyCronJob.start();
}

export default { schedule };
