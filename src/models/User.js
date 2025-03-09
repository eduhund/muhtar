import BaseModel from "./BaseModel.js";
import { hashPassword } from "../utils/password.js";

export default class User extends BaseModel {
  constructor({ id, firstName, lastName, email, createdAt }) {
    super();
    this.id = id;
    this.firstName = firstName ?? "";
    this.lastName = lastName ?? "";
    this.email = email ?? "";
    this.createdAt = createdAt ?? new Date();
  }

  static collectionName = "users";

  getFullName() {
    let fullName = this.firstName;
    if (this.lastName) {
      fullName += ` ${this.lastName}`;
    }
    return fullName;
  }

  async changeEmail(newEmail) {
    this.email = newEmail;
    await this.save();
  }

  async changeName(firstName, lastName) {
    this.firstName = firstName ? firstName : this.firstName;
    this.lastName = lastName ? lastName : this.lastName;
    await this.save();
  }

  async changePassword(newPassword) {
    this.password = await hashPassword(newPassword);
    await this.save();
  }
}
