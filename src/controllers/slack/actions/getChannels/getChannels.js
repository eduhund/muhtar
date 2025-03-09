import { slack } from "../../slack.js";

export async function getChannels() {
  const response = await slack.client.conversations.list({
    types: "private_channel",
    exclude_archived: true,
  });
  if (!response.ok) {
    throw new Error("Slack can't get channels list");
  }
  return response?.channels || [];
}
