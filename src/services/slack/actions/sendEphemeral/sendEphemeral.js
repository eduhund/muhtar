import log from "../../../log4js/logger.js";
import { slack } from "../../slack.js";
import * as messageTypes from "../../messageBuilder.js";

export async function sendEphemeral(messageType, data) {
  console.log(data);
  const messageFn = messageTypes[messageType];
  if (messageFn) {
    await slack.client.chat.postEphemeral(messageFn(data));
    log.debug("Slack — Message has been sent: ", data);
  }
}
