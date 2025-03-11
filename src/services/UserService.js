import { v4 as uuidv4 } from "uuid";

import Service from "./Service.js";
import User from "../models/User.js";

export default class UserService extends Service {
  constructor(repository, services) {
    super(repository);
    this.membershipService = services.membershipService;
  }
  async createUser(data) {
    const existingUsers = await this.repository.find({ email: data.email });
    if (existingUsers.length > 0) {
      throw new Error("Email already exists");
    }
    const id = uuidv4();
    const user = new User({
      id,
      firstName,
      lastName,
      email,
      createdAt: new Date(),
    });

    await this.repository.create(user);

    return user;
  }

  async getUserById(id) {
    const data = await this.repository.findById(id);
    return data ? new User(data) : null;
  }

  async getUserByEmail(email) {
    const data = await this.repository.findByEmail(email);
    return data ? new User(data) : null;
  }

  async getUserCredentials(userId) {
    const data = await this.repository.findById(userId, ["password"]);
    if (!data) throw new Error("User not found");

    return { password: data.password };
  }

  async updatePassword(userId, hashedPassword) {
    return this.repository.update(userId, { password: hashedPassword });
  }

  async getUserBySlackId(slackId) {
    const data = await this.repository.findOne({ "slack.userId": slackId });
    return data ? new User(data) : null;
  }

  async findAllUsers(criteria = {}) {
    const data = await this.adapter.findAll(criteria);
    return data.map((user) => new User(user));
  }

  async findActiveUsers(criteria = {}) {
    const data = await this.findAllUsers({ isDeleted: false, ...criteria });
    return data.map((user) => new User(user));
  }

  async getUsersByTeam(teamId) {
    const data = await this.membershipService.findTeamMembers({ teamId });
    return data.map((user) => new User(user));
  }
}
