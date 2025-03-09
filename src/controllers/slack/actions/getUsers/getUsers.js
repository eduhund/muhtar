import { slack } from "../../slack.js";

export async function getUsers() {
  const response = await slack.client.users.list();
  if (!response.ok) {
    throw new Error("Slack can't get users list");
  }
  return response?.members || [];
}
