import BaseModel from "./BaseModel.js";
import { hash } from "../utils/hash.js";

export default class User extends BaseModel {
  constructor(data) {
    super(data._id, "users");
    this.firstName = data.firstName ?? "";
    this.lastName = data.lastName ?? "";
    this.email = data.email ?? "";
    this._password = data._password ?? null;
    this.createdAt = data.createdAt ?? new Date();
  }

  getFullName() {
    let fullName = this.firstName;
    if (this.lastName) {
      fullName += ` ${this.lastName}`;
    }
    return fullName;
  }

  getPassword() {
    return this._password;
  }

  changeEmail(newEmail) {
    this.email = newEmail;
    this.saveChanges("email");
    return this;
  }

  changeName(firstName, lastName) {
    this.firstName = firstName ? firstName : this.firstName;
    this.lastName = lastName ? lastName : this.lastName;
    this.saveChanges(["firstName", "lastName"]);
    return this;
  }

  async changePassword(newPassword) {
    this._password = await hash(newPassword);
    this.saveChanges("_password");
    return this;
  }
}
