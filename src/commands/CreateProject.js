import { getChannelInfo } from "../controllers/slack/actions/index.js";
import { membershipService } from "../services/index.js";

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
      userId,
    });
  }

  static async fromSlack({ user, channel, team, inviter }) {
    const channelName = await getChannelInfo(channel);
    const userData = await membershipService.getMembershipBySlackId(user, team);

    const inviterData = await membershipService.getMembershipBySlackId(
      inviter,
      team
    );

    if (!userData || !inviterData) {
      throw new Error("Can't find the Slack connection of the user");
    }

    const { userId, teamId } = userData;
    const { userId: inviterId } = inviterData;

    return new CreateProjectCommand({
      source: "Slack",
      name: channelName,
      teamId,
      userId,
      inviterId,
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
