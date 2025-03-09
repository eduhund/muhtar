import log from "../../utils/log.js";
import { getParams } from "../../utils/commandParams.js";
//import { sendEphemeral } from "../../services/slack/actions.js";
//import { updateProject } from "../../services/mongo/actions.js";

export async function renameProject({ channelId, userId, text }) {
  try {
    /*
    const { value } = getParams(text);
    if (!value) {
      await sendEphemeral("renameEmpty", {
        channelId,
        userId,
      });
      return;
    }
    const data = {
      id: channelId,
      name: value,
    };
    await updateProject("set", data);
    await sendEphemeral("renameSuccess", {
      channelId,
      userId,
      newName: value,
    });
    return;*/
  } catch (e) {
    log.error("Error with renaming the project\n", e);
  }
}
