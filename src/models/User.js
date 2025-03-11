import { BaseModel, BaseFactory } from "./BaseModel.js";
import userRepository from "../repositories/UserRepository.js";
import { hash } from "../utils/hash.js";

export class User extends BaseModel {
  constructor({ id, firstName, lastName, email, createdAt }) {
    super();
    if (id) this.id = id;
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
    await this.save();
    return this;
  }

  async changeName(firstName, lastName) {
    this.firstName = firstName ? firstName : this.firstName;
    this.lastName = lastName ? lastName : this.lastName;
    await this.save();
    return this;
  }

  async changePassword(newPassword) {
    this.password = await hash(newPassword);
    await this.save();
    return this;
  }

  async save() {
    const data = { ...this };
    delete data.id;
    await this.repository.updateOne(
      { _id: this.id },
      { $set: data },
      { upsert: true }
    );
    return this;
  }
}

export class UserFactory extends BaseFactory {
  createUser(data) {
    return new User({ ...data, repository: this.repository });
  }

  createUsers(data = []) {
    return data.map((user) => this.createUser(user));
  }
}

export default new UserFactory(userRepository);
