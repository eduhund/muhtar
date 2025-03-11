import BaseModel from "./BaseModel.js";
import { hash } from "../utils/hash.js";

export default class User extends BaseModel {
  constructor(data) {
    super(data);
    this.firstName = data.firstName ?? "";
    this.lastName = data.lastName ?? "";
    this.email = data.email ?? "";
    this.createdAt = data.createdAt ?? new Date();
  }

  getFullName() {
    let fullName = this.firstName;
    if (this.lastName) {
      fullName += ` ${this.lastName}`;
    }
    return fullName;
  }

  async changeEmail(newEmail) {
    this.email = newEmail;
    return this;
  }

  async changeName(firstName, lastName) {
    this.firstName = firstName ? firstName : this.firstName;
    this.lastName = lastName ? lastName : this.lastName;
    return this;
  }

  async changePassword(newPassword) {
    this.password = await hash(newPassword);
    return this;
  }
}
