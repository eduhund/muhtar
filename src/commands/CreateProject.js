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

  static fromSlack({ name, user, channel }) {
    return new CreateProjectCommand({
      source: "Slack",
      name,
      slackData: {
        userId: user,
        channelId: channel,
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
