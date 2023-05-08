const cron = require("cron");
const { setDays } = require("../isDayOff/isDayOff");

async function monthlyCronTick() {
	setDays();
}

async function schedule() {
	monthlyCronJob = new cron.CronJob("0 0 1 * *", monthlyCronTick);
	//dailyCronJob = new cron.CronJob("0 0 * * *", dailyCronTick);
	//hourlyCronJob = new cron.CronJob("45 10-18 * * *", hourlyCronTick);
	monthlyCronJob.start();
	//dailyCronJob.start();
	//hourlyCronJob.start();
}

module.exports = { schedule };
