export default class ProjectService {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
  }

  async createProject(data) {
    return await this.projectRepository.create(data);
  }

  async getProjectById(id) {
    return await this.projectRepository.findById(id);
  }

  async getProjectsByTeam(teamId) {
    return await this.projectRepository.findByTeamId(teamId);
  }

  async getProjectBySlackId(channelId) {
    return this.projectRepository.findOne({ "slack.channelId": channelId });
  }
}
