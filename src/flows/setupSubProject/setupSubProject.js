import log from "../../utils/log.js";
//import { getProjectInfo, updateProject } from "../../services/mongo/actions.js";
//import { sendEphemeral } from "../../services/slack/actions.js";
import { getParams } from "../../utils/commandParams.js";

export async function setupSubProject({ channelId, teamId, userId, text }) {
  try {
    /*
    const { param, value } = getParams(text);
    if (param === "-list") {
      const project = await getProjectInfo({ channelId, teamId });
      if (!project) return;
      const { subprojects, name } = project;
      if (!subprojects || subprojects.length === 0) {
        await sendEphemeral("noSubProjects", { channelId, userId, name });
        return;
      }

      await sendEphemeral("subProjectsList", {
        channelId,
        userId,
        subprojects,
      });
      return;
    }

    if (param === "-add") {
      const data = {
        id: channelId,
        subprojects: value,
      };

      await updateProject("push", data);
      await sendEphemeral("addSubProject", {
        channelId,
        userId,
        subproject: value,
      });
      return;
    }

    if (param === "-remove") {
      const data = {
        id: channelId,
        subprojects: value,
      };

      await updateProject("pull", data);
      await sendEphemeral("removeSubProject", {
        channelId,
        userId,
        subproject: value,
      });
      return;
    }
    */
  } catch (e) {
    log.error("Error with processing subproject\n", e);
  }
}
