import Service from "./Service.js";

export default class TeamService extends Service {
  static async createTeam(data) {
    return await this.repository.create(data);
  }

  static async getTeamById(id) {
    return await this.repository.findById(id);
  }

  static async getTeamBySlackId(slackId) {
    return this.repository.findOne({ "slack.teamId": slackId });
  }
}
