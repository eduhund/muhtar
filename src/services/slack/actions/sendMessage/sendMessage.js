import log from "../../../log4js/logger.js";
import { slack } from "../../slack.js";
import * as messageTypes from "../../messageBuilder.js";

export async function sendMessage(messageType, data) {
  const messageFn = messageTypes[messageType];
  if (messageFn) {
    await slack.client.chat.postMessage(messageFn(data));
    log.debug("Slack — Message has been sent: ", data);
  }
}
