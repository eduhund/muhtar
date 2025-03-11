import { v4 as uuidv4 } from "uuid";
import userFactory from "../models/User.js";

export default class UserRepository {
  constructor(adapter) {
    this.adapter = adapter;
  }

  async findById(id, returnFields) {
    const data = await this.adapter.findOne("users", { id }, returnFields);
    return data ? userFactory.createUser(data) : null;
  }

  async findByEmail(email) {
    const data = await this.adapter.findOne("users", { email });
    return data ? userFactory.createUser(data) : null;
  }

  async findBySlackId(slackId) {
    const data = await this.adapter.findOne("users", { slackId });
    return data ? userFactory.createUser(data) : null;
  }

  static async create({ email, firstName, lastName }) {
    const id = uuidv4();
    const user = userFactory.createUser({
      id,
      firstName,
      lastName,
      email,
      createdAt: new Date(),
    });
    await user.save();
    return user;
  }
}
