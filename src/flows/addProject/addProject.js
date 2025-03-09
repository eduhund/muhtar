import log from "../../utils/log.js";
//import { getProject, setProject } from "../../services/mongo/actions.js";
//import { getChannelInfo, sendMessage } from "../../services/slack/actions.js";

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
