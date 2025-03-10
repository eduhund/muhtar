export default class CreateProjectCommand {
  constructor({ source, title, ...rest }) {
    this.source = source;
    this.title = title;
    Object.assign(this, rest);
  }

  static fromHttp({ title, teamId, userId }) {
    return new CreateProjectCommand({
      source: "API",
      title,
      teamId,
      userId,
    });
  }

  static fromSlack({ title, user, channel }) {
    return new CreateProjectCommand({
      source: "Slack",
      title,
      slackData: {
        userId: user,
        channelId: channel,
      },
    });
  }

  static fromTelegram({ title, user_id }) {
    return new CreateProjectCommand({
      source: "Telegram",
      title,
      telegramData: { userId: user_id || null },
    });
  }
}
