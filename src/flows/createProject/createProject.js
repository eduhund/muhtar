import log from "../../utils/log.js";

export default class CreateProjectFlow {
  constructor({
    projectService,
    membershipService,
    //responseAdapter,
  }) {
    this.projectService = projectService;
    this.membershipService = membershipService;
    //this.responseAdapter = responseAdapter;
  }

  async execute({ source, name, teamId, creator, ...rest }) {
    try {
      const newProject = { name, teamId, creator };

      if (source === "Slack") {
        const { slackData } = rest;
        const isProjectExist = await this.projectService.getProjectBySlackId(
          slackData.channelId,
          slackData.teamId
        );

        if (isProjectExist) {
          //this.responseAdapter.send(source, "Project already exist!");
          throw new Error("Project already exist");
        }
        newProject.connections = {
          slack: { ...slackData },
        };
      } else if (source === "Telegram") {
        log.info("to-do");
      }
      const project = await this.projectService.createProject(newProject);

      /*
      this.responseAdapter.send(
        source,
        `Project ${newProject.name} was created!`
      );
      */
      return project;
    } catch (e) {
      log.error("Error with creating the project!");
      log.debug(e);
    }
  }
}

export async function addProject({ channelId, teamId }) {
  try {
    /*
    const isProjectExist = (await getProject({ channelId, teamId }))
      ? true
      : false;
    if (isProjectExist) {
      await sendMessage("addToExistProject", { channelId });
      return;
    }
    const { name, purpose } = await getChannelInfo(channelId);
    const data = {
      id: channelId,
      channelName: name,
      isArchived: false,
      name: purpose?.value || name,
      teamId: teamId,
    };
    await setProject("set", data);
    await sendMessage("addNewProject", { channelId, name: data.name });
    */
  } catch (e) {
    log.error("Error with adding project info to bot\n", e);
  }
}
