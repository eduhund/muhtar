import { getChannelInfo } from "../controllers/slack/actions/index.js";
import { memberships } from "../services/index.js";

export default class CreateProjectCommand {
  constructor({ source, name, ...rest }) {
    this.source = source;
    this.name = name;
    Object.assign(this, rest);
  }

  static fromHttp({ name, teamId, userId }) {
    return new CreateProjectCommand({
      source: "API",
      name,
      teamId,
      creator: userId,
    });
  }

  static async fromSlack({ channel, team, inviter }) {
    const { name } = await getChannelInfo(channel);

    const creatorData = await memberships.getMembershipBySlackId(inviter, team);

    if (!creatorData) {
      throw new Error("Can't find the Slack connection of the user");
    }

    const { userId, teamId } = creatorData;

    return new CreateProjectCommand({
      source: "Slack",
      name: name,
      teamId,
      creator: userId,
      slackData: {
        channelId: channel,
        teamId: team,
      },
    });
  }

  static fromTelegram({ name, user_id }) {
    return new CreateProjectCommand({
      source: "Telegram",
      name,
      telegramData: { userId: user_id || null },
    });
  }
}
