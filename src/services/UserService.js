import User from "../models/User.js";
import Service from "./Service.js";

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
    return await this.repository.findById(id);
  }

  async getUserByEmail(email) {
    return await this.repository.findByEmail(email);
  }

  async getUserCredentials(userId) {
    const data = await this.repository.findById(userId, ["password"]);
    if (!data) throw new Error("User not found");

    return { password: data.password };
  }

  async updatePassword(userId, hashedPassword) {
    return this.repository.update(userId, { password: hashedPassword });
  }

  async getUsersByTeam(teamId) {
    return await this.membershipService.findTeamMembers({ teamId });
  }

  async getUserBySlackId(slackId) {
    return this.repository.findOne({ "slack.userId": slackId });
  }

  async findAllUsers(criteria = {}) {
    const data = await this.adapter.findAll(criteria);
    return data.map((user) => new User(user));
  }

  async findActiveUsers(criteria = {}) {
    const data = await this.findAllUsers({ isDeleted: false, ...criteria });
    return data.map((user) => new User(user));
  }
}
