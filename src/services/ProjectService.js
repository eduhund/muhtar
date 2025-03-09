export default class ProjectService {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
  }

  static async createProject(data) {
    return await this.projectRepository.create(data);
  }

  static async getProjectById(id) {
    return await this.projectRepository.findById(id);
  }

  static async getProjectsByTeam(teamId) {
    return await this.projectRepository.findByTeamId(teamId);
  }

  static async getProjectBySlackId(channelId) {
    return this.projectRepository.findOne({ "slack.channelId": channelId });
  }
}
