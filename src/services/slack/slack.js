import log from "../log4js/logger.js";
import bolt from "@slack/bolt";

import {
  renderModal,
  addTime,
  addProject,
  addUser,
  setupSubProject,
  renameProject,
  getLastTime,
} from "../../flows/flows.js";
import { incomingData } from "./prepareData.js";

const { App } = bolt;

const {
  SLACK_TOKEN,
  SLACK_APP_TOKEN,
  SLACK_PORT = 3000,
  SLACK_BOT_ID,
} = process.env;

if (!SLACK_TOKEN || !SLACK_APP_TOKEN) {
  throw new Error(
    "Slack credentials is not defined. Check SLACK_TOKEN and SLACK_APP_TOKEN env variables"
  );
}

export const slack = new App({
  token: SLACK_TOKEN,
  appToken: SLACK_APP_TOKEN,
  socketMode: true,
});

slack.command("/time", async ({ payload, ack }) => {
  log.debug("Slack — New bot command: ", payload);
  const data = incomingData(payload);
  await renderModal(data);
  ack();
});

slack.command("/subprj", async ({ payload, ack }) => {
  log.debug("Slack — New bot command: ", payload);
  const data = incomingData(payload);
  await setupSubProject(data);
  ack();
});

slack.command("/rename_prj", async ({ payload, ack }) => {
  log.debug("Slack — New bot command: ", payload);
  const data = incomingData(payload);
  await renameProject(data);
  ack();
});

slack.command("/last_time", async ({ payload, ack }) => {
  log.debug("Slack — New bot command: ", payload);
  const data = incomingData(payload);
  await getLastTime(data);
  ack();
});

slack.view("timeModal", async ({ body, ack }) => {
  log.debug("Slack — New view submit: ", body);
  const data = incomingData(body);
  await addTime(data);
  ack();
});

slack.event("member_joined_channel", async ({ event }) => {
  if (event.user !== SLACK_BOT_ID) {
    return;
  }
  log.debug("Slack — Bot added to new channel: ", event);
  const data = incomingData(event);
  await addProject(data);
});

slack.event("team_join", async ({ event }) => {
  log.debug("Slack — New person inda house: ", event);
  const data = incomingData(event);
  await addUser(data);
});

export async function start() {
  await slack.start(SLACK_PORT);

  log.info("Slack service was started");
}

export default { slack, start };
