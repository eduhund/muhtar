import "dotenv/config";
import log from "./src/services/log4js/logger.js";
import scheduler from "./src/services/cron/cron.js";
import express from "./src/services/express/express.js";
import mongo from "./src/services/mongo/mongo.js";
import slack from "./src/services/slack/slack.js";
import { setWorkdays } from "./src/services/isDayOff/isDayOff.js";

(async () => {
  try {
    await express.start();
    await mongo.start();
    await slack.start();
    await scheduler.schedule();
    await setWorkdays();
    log.info("All systems running. Let's rock!");
  } catch (e) {
    log.error("Hewston, we have a problem!");
    log.debug(e);
    process.exit(1);
  }
})();
