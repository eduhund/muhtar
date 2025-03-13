import log from "../../utils/log.js";

export default class CreateProjectFlow {
  constructor({ projects, memberships }) {
    this.projectService = projects;
    this.membershipService = memberships;
  }

  execute = async ({ source, name, teamId, creator, ...rest }) => {
    try {
      const newProject = { name, teamId, creator };

      if (source === "Slack") {
        const { slackData } = rest;
        newProject.connections = {
          slack: { ...slackData },
        };
      }
      const project = await this.projectService.createProject(newProject);

      return project;
    } catch (e) {
      log.error("Error with creating the project!");
      log.debug(e);
    }
  };
}
