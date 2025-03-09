export default class TeamService {
  constructor(teamRepository) {
    this.teamRepository = teamRepository;
  }

  static async createTeam(data) {
    return await this.teamRepository.create(data);
  }

  static async getTeamById(id) {
    return await this.teamRepository.findById(id);
  }

  static async getTeamBySlackId(slackId) {
    return this.teamRepository.findOne({ "slack.teamId": slackId });
  }
}
