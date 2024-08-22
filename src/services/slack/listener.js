import log from "../../services/log4js/logger.js";

import { slack } from "./slack.js";
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

const botId = process.env.SLACK_BOT_ID;

export function slackListenerRun() {
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
    if (event.user !== botId) {
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
}
