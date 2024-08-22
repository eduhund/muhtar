import log from "../log4js/logger.js";
import bolt from "@slack/bolt";
const { App } = bolt;

export const slack = new App({
  token: process.env.SLACK_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  //signingSecret: process.env.SLACK_S_SECRET,
  socketMode: true,
});

export async function start() {
  await slack.start(process.env.SLACK_PORT || 3000);

  log.info("Slack is running");
}

export default { slack, start };
