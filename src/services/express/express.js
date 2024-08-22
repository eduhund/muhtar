import log from "../log4js/logger.js";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.SERVER_PORT || 80;

app.use(bodyParser.urlencoded({ extended: false }));
/*
app.post("/slack/payload", handleSlackPayload);
app.post("/slack/time", handleTimeCommand);
app.post("/slack/update_lists", handleUpdateListsCommand);
*/

async function start() {
  return new Promise((resolve, reject) => {
    app.listen(port, (err) => {
      if (err) {
        return reject(err);
      }
      log.info("Server starts on port", port);
      return resolve();
    });
  });
}

export default { app, start };
