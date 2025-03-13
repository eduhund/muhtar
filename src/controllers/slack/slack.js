import bolt from "@slack/bolt";

import {
  CreateProjectCommand,
  AddMembershipToProjectCommand,
} from "../../commands/index.js";

import {
  renderModal,
  addTime,
  createProjectFlow,
  addUser,
  setupSubProject,
  renameProject,
  getLastTime,
} from "../../flows/index.js";
import { prepareData } from "./utils.js";
import log from "../../utils/log.js";
import { sendMessage, sendFallback } from "./actions/index.js";

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
  const data = prepareData(payload);
  await renderModal(data);
  ack();
});

slack.command("/subprj", async ({ payload, ack }) => {
  log.debug("Slack — New bot command: ", payload);
  const data = prepareData(payload);
  await setupSubProject(data);
  ack();
});

slack.command("/rename_prj", async ({ payload, ack }) => {
  log.debug("Slack — New bot command: ", payload);
  const data = prepareData(payload);
  await renameProject(data);
  ack();
});

slack.command("/last_time", async ({ payload, ack }) => {
  log.debug("Slack — New bot command: ", payload);
  const data = prepareData(payload);
  await getLastTime(data);
  ack();
});

slack.view("timeModal", async ({ body, ack }) => {
  log.debug("Slack — New view submit: ", body);
  const data = prepareData(body);
  await addTime(data);
  ack();
});

slack.event("member_joined_channel", async ({ event }) => {
  if (event?.user === SLACK_BOT_ID) {
    try {
      log.debug("Slack — Bot added to new channel: ", event);

      const command = await CreateProjectCommand.fromSlack(event);
      if (!command)
        return sendMessage("addToExistProject", { channelId: event.channel });
      const project = await createProjectFlow(command);
      return sendMessage("addNewProject", project);
    } catch (e) {
      log.error("Error while adding the project");
      log.debug(e);
      sendFallback("🚨 Something went wrong...", event.channel, event.inviter);
    }
  } else {
    log.debug("Slack — User added to new channel: ", event);
    const command = await AddMembershipToProjectCommand.fromSlack(event);
    if (!command)
      return sendMessage("addToExistProject", { channelId: event.channel });
    const project = await createProjectFlow(command);
    return sendMessage("addNewProject", project);
  }
});

slack.event("team_join", async ({ event }) => {
  log.debug("Slack — New person inda house: ", event);
  const data = prepareData(body);
  await addUser(data);
});

export async function start() {
  await slack.start(SLACK_PORT);

  log.info("Slack service was started");
}

export default { slack, start };
