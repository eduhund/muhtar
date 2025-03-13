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

  execute = async ({ email, password }) => {
    const user = await this.userService.getUserByEmail(email);
    if (!user) throw new Error("User not found");

    const isValid = await this.authService.verifyPassword(user.id, password);
    if (!isValid) throw new Error("Invalid password");

    return this.authService.generateToken(user);
  };
}
