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
}
