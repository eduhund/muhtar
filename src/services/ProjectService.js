import Service from "./Service.js";

export default class ProjectService extends Service {
  async createProject(data) {
    return await this.repository.create(data);
  }

  async getProjectById(id) {
    return await this.repository.findById(id);
  }

  async getProjectsByTeam(teamId) {
    return await this.repository.findByTeamId(teamId);
  }

  async getProjectBySlackId(channelId) {
    return this.repository.findOne({ "slack.channelId": channelId });
  }
}
