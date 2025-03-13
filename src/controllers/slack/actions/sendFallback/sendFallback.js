import log from "../../../../utils/log.js";
import { slack } from "../../slack.js";

export async function sendFallback(text, channel, user) {
  await slack.client.chat.postEphemeral({ channel, user, text });
  log.debug("Slack — Fallback has been sent: ", text, channel, user);
}
