import "dotenv/config";
import scheduler from "./src/services/cron/cron.js";
import express from "./src/services/express/express.js";
import mongo from "./src/services/mongo/mongo.js";
import slack from "./src/services/slack/slack.js";
import { auth } from "./src/services/google/google.js";
import { slackListenerRun } from "./src/services/slack/listener.js";
import { sendHoursToManager } from "./src/scripts/index.js";
import { setDays } from "./src/services/isDayOff/isDayOff.js";

(async () => {
  await express.start();
  await mongo.start();
  await slack.start();
  slackListenerRun();
  await auth();
  await scheduler.schedule();
  await setDays();
  sendHoursToManager();
})();
