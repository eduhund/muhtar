import log from "../../../../utils/log.js";
import { slack } from "../../slack.js";
import * as messageTypes from "../../messageBuilder.js";

export async function sendMessage(messageType, data) {
  console.log(data);
  const messageFn = messageTypes[messageType];
  if (messageFn) {
    await slack.client.chat.postMessage(messageFn(data));
    log.debug("Slack — Message has been sent: ", data);
  }
}
