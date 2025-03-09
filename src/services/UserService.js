import User from "../models/User.js";

export default class UserService {
  constructor(userRepository, membershipService) {
    this.userRepository = userRepository;
    this.membershipService = membershipService;
  }
  static async createUser(data) {
    const existingUsers = await this.userRepository.find({ email: data.email });
    if (existingUsers.length > 0) {
      throw new Error("Email already exists");
    }

    return await this.userRepository.create(data);
  }

  static async getUserById(id) {
    return await this.userRepository.findById(id);
  }

  static async getUserByEmail(email) {
    return await this.userRepository.findOne({ email });
  }

  static async getUsersByTeam(teamId) {
    return await this.membershipService.findTeamMembers({ teamId });
  }

  static async getUserBySlackId(slackId) {
    return this.userRepository.findOne({ "slack.userId": slackId });
  }

  static async findAllUsers(criteria = {}) {
    const data = await this.adapter.findAll(criteria);
    return data.map((user) => new User(project));
  }

  static async findActiveUsers(criteria = {}) {
    const data = await this.findAllUsers({ isDeleted: false, ...criteria });
    return data.map((project) => new User(project));
  }
}
