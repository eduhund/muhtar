import "dotenv/config";
import log from "./src/utils/log.js";
import scheduler from "./src/utils/cron.js";
import express from "./src/controllers/express/express.js";
import * as mongo from "./src/controllers/mongo/mongo.js";
import slack from "./src/controllers/slack/slack.js";
import { setWorkdays } from "./src/utils/isDayOff.js";

(async () => {
  try {
    await express.start();
    await mongo.connect();
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
