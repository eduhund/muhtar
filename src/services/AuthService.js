import { compare } from "../utils/hash.js";
import { setToken } from "../utils/tokens.js";
import Service from "./Service.js";

export default class AuthService extends Service {
  constructor(services) {
    super();
    this.userService = services.users;
  }
  async verifyPassword(userId, inputPassword) {
    const { password } = await this.userService.getUserCredentials(userId);
    return compare(inputPassword, password);
  }

  async changePassword(userId, oldPassword, newPassword) {
    const user = await this.userService.getUserById(userId);
    if (!user) throw new Error("User not found");

    const isMatch = await compare(oldPassword, user.getPassword());
    if (!isMatch) throw new Error("Incorrect old password");

    await user.changePassword(newPassword);

    return { message: "Password changed successfully" };
  }

  generateToken(user) {
    return setToken(user._id);
  }
}
