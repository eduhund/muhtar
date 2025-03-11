import Service from "./Service.js";

export default class MembershipService extends Service {
  static async createMembership(data) {
    return await this.repository.create(data);
  }

  static async getMembershipById(id) {
    return await this.repository.findById(id);
  }

  static async getMembershipBySlackId(userId, teamId) {
    return await this.repository.findBySlackId(userId, teamId);
  }

  static async getMembershipsByTeam(teamId) {
    return await this.repository.findAllByTeamId(teamId);
  }

  static async getMembershipsByUser(userId) {
    return this.repository.findAllByUser(userId);
  }
}
