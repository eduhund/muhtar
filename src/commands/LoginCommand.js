export default class LoginCommand {
  constructor({ source, email, password, ...rest }) {
    this.email = email;
    this.password = password;
    Object.assign(this, rest);
  }

  static fromHttp({ email, password }) {
    return new LoginCommand({
      source: "API",
      email,
      password,
    });
  }

  // TO-DO
  static fromSlack({ title, user, channel }) {
    return new LoginCommand({
      source: "Slack",
      title,
      slackData: {
        userId: user,
        channelId: channel,
      },
    });
  }

  static fromTelegram({ title, user_id }) {
    return new LoginCommand({
      source: "Telegram",
      title,
      telegramData: { userId: user_id || null },
    });
  }
}
