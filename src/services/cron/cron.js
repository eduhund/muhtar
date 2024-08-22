import cron from "cron";
import { setDays } from "../isDayOff/isDayOff.js";

async function monthlyCronTick() {
  setDays();
}

async function schedule() {
  const monthlyCronJob = new cron.CronJob("0 0 1 * *", monthlyCronTick);
  //dailyCronJob = new cron.CronJob("0 0 * * *", dailyCronTick);
  //hourlyCronJob = new cron.CronJob("45 10-18 * * *", hourlyCronTick);
  monthlyCronJob.start();
  //dailyCronJob.start();
  //hourlyCronJob.start();
}

export default { schedule };
