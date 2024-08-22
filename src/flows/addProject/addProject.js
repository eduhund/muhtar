import log from "../../services/log4js/logger.js";
import { getProjectInfo, updateProject } from "../../services/mongo/actions.js";
import { getChannelInfo, sendMessage } from "../../services/slack/actions.js";

export async function addProject({ channelId, teamId }) {
  try {
    const isProjectExist = (await getProjectInfo({ channelId, teamId }))
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
    await updateProject((type = "set"), data);
    await sendMessage("addNewProject", { channelId, name: data.name });
  } catch (e) {
    log.error("Error with adding project info to bot\n", e);
  }
}
