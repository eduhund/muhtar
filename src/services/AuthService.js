import { hash, compare } from "../utils/hash.js";
import { setToken } from "../utils/tokens.js";
import Service from "./Service.js";

export default class AuthService extends Service {
  constructor(services) {
    super();
    this.userService = services.userService;
  }
  async verifyPassword(userId, inputPassword) {
    const { password } = await this.userService.getUserCredentials(userId);
    return compare(inputPassword, password);
  }

  async changePassword(userId, oldPassword, newPassword) {
    const user = await this.userService.getUserById(userId);
    if (!user) throw new Error("User not found");

    const isMatch = await compare(oldPassword, user.password);
    if (!isMatch) throw new Error("Incorrect old password");

    const hashedPassword = await hash(newPassword);

    await this.userService.updatePassword(userId, hashedPassword);

    return { message: "Password changed successfully" };
  }

  generateToken(user) {
    return setToken(user.userId);
  }
}
