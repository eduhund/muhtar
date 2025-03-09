export default class TimeService {
  constructor(timeRepository) {
    this.timeRepository = timeRepository;
  }

  static async addTime(data) {
    return await this.timeRepository.create(data);
  }

  static async getTimeById(ts) {
    return await this.timeRepository.findById(ts);
  }

  static async getTimetableByUser(ts) {
    return await this.timeRepository.findByAllByUser(userId);
  }

  static async getTimetableByProject(projectId) {
    return await this.timeRepository.findAllByProject(projectId);
  }

  static async getTimetableByTeam(teamId) {
    return await this.timeRepository.findAllByTeam(teamId);
  }

  static async getTimetableByPeriod(from, to, teamId) {
    return await this.timeRepository.findAllByPeriod(from, to, teamId);
  }
}
