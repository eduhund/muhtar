import { v4 as uuidv4 } from "uuid";
import User from "../models/User.js";

export default class Users {
  constructor(adapter) {
    this.adapter = adapter;
  }

  async findById(id, returnFields) {
    const data = await this.adapter.findOne("users", { id }, returnFields);
    return data ? new User(data) : null;
  }

  async findByEmail(email) {
    const data = await this.adapter.findOne("users", { email });
    return data ? new User(data) : null;
  }

  async findBySlackId(slackId) {
    const data = await this.adapter.findOne("users", { slackId });
    return data ? new User(data) : null;
  }

  async save(user) {
    await this.adapter.updateOne("users", user);
  }

  static async create({ email, firstName, lastName }) {
    const id = uuidv4();
    const user = new User({
      id,
      firstName,
      lastName,
      email,
      createdAt: new Date(),
    });
    return user;
  }
}
