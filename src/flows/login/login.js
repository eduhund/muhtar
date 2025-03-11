export default class LoginFlow {
  constructor({
    userService,
    authService,
    //responseAdapter,
  }) {
    this.userService = userService;
    this.authService = authService;
    //this.responseAdapter = responseAdapter;
  }

  async execute({ email, password }) {
    const user = await this.userService.getUserByEmail(email);
    if (!user) throw new Error("User not found");

    console.log(password, user);

    const isValid = await this.authService.verifyPassword(
      password,
      user.password
    );
    if (!isValid) throw new Error("Invalid password");

    return this.authService.generateToken(user);
  }
}
