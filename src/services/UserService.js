import { v4 as uuidv4 } from "uuid";

import Service from "./Service.js";
import User from "../models/User.js";

export default class UserService extends Service {
  constructor(adapter, collection, services) {
    super(adapter, collection);
    this.membershipService = services.membershipService;
  }
  async createUser(data) {
    const existingUser = await this.getUserByEmail(data.email);
    if (existingUser) {
      throw new Error("Email already exists");
    }
    const user = new User({
      _id: uuidv4(),
      _password,
      email,
      firstName,
      lastName,
      createdAt: new Date(),
    });

    user.saveChanges();

    return user;
  }

  async getUserById(_id) {
    const data = await this._findOne({ _id });
    return data ? new User(data) : null;
  }

  async getUserByEmail(email) {
    const data = await this._findOne({ email });
    return data ? new User(data) : null;
  }

  async getUserBySlackId(userId, teamId) {
    const data = await this._findOne({
      "connections.slack.userId": userId,
      "connections.slack.teamId": teamId,
    });
    return data ? new User(data) : null;
  }

  async findAllUsers() {
    const data = await this._findMany({});
    return data.map((user) => new User(user));
  }

  async findActiveUsersByTeam(teamId) {
    const data = await this._findMany({ teamId, isDeleted: false });
    return data.map((user) => new User(user));
  }

  async getUsersByTeam(teamId) {
    const data = await this._findMany({ teamId });
    return data.map((user) => new User(user));
  }
}
