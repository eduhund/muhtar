import Service from "./Service.js";

export default class TimeService extends Service {
  static async addTime(data) {
    return await this.repository.create(data);
  }

  static async getTimeById(ts) {
    return await this.repository.findById(ts);
  }

  static async getTimetableByUser(ts) {
    return await this.repository.findByAllByUser(userId);
  }

  static async getTimetableByProject(projectId) {
    return await this.repository.findAllByProject(projectId);
  }

  static async getTimetableByTeam(teamId) {
    return await this.repository.findAllByTeam(teamId);
  }

  static async getTimetableByPeriod(from, to, teamId) {
    return await this.repository.findAllByPeriod(from, to, teamId);
  }
}
