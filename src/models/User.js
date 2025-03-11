import BaseModel from "./BaseModel.js";
import { hash } from "../utils/hash.js";

export default class User extends BaseModel {
  constructor({ id, firstName, lastName, email, createdAt }) {
    super(data);
    this.firstName = firstName ?? "";
    this.lastName = lastName ?? "";
    this.email = email ?? "";
    this.createdAt = createdAt ?? new Date();
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
