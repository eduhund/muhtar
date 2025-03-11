import User from "../models/User.js";

export default class UserService {
  constructor(userRepository, membershipService) {
    this.userRepository = userRepository;
    this.membershipService = membershipService;
  }
  async createUser(data) {
    const existingUsers = await this.userRepository.find({ email: data.email });
    if (existingUsers.length > 0) {
      throw new Error("Email already exists");
    }

    return await this.userRepository.create(data);
  }

  async getUserById(id) {
    return await this.userRepository.findById(id);
  }

  async getUserByEmail(email) {
    return await this.userRepository.findByEmail(email);
  }

  async getUserCredentials(userId) {
    const userData = await this.userRepository.findById(userId, ["password"]);
    if (!userData) throw new Error("User not found");

    return { password: userData.password };
  }

  async updatePassword(userId, hashedPassword) {
    return this.userRepository.update(userId, { password: hashedPassword });
  }

  async getUsersByTeam(teamId) {
    return await this.membershipService.findTeamMembers({ teamId });
  }

  async getUserBySlackId(slackId) {
    return this.userRepository.findOne({ "slack.userId": slackId });
  }

  async findAllUsers(criteria = {}) {
    const data = await this.adapter.findAll(criteria);
    return data.map((user) => new User(project));
  }

  async findActiveUsers(criteria = {}) {
    const data = await this.findAllUsers({ isDeleted: false, ...criteria });
    return data.map((project) => new User(project));
  }
}
