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

  async execute({ source, name, ...rest }) {
    try {
      const newProject = { name };

      if (source === "Slack") {
        const isProjectExist = await this.projectService.findBySlackId(
          rest.slackData.channelId,
          rest.slackData.teamId
        );

        /*
        if (isProjectExist) {
          this.responseAdapter.send(source, "Project already exist!");
          return;
        }
        */

        const { userId, teamId } = this.membershipService.findBySlackId(
          rest.slackData.userId,
          teamId
        );

        newProject.teamId = teamId;
        newProject.creatorId = userId;
      } else if (source === "Telegram") {
        log.info("to-do");
      } else {
        newProject.teamId = rest.teamId;
        newProject.creatorId = rest.userId;
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
