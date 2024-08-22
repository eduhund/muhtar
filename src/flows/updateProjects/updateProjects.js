import log from "../../services/log4js/logger.js";
import { updateProject } from "../../services/mongo/actions.js";
import { getChannels } from "../../services/slack/actions.js";

// Deprecated
export async function updateProjects() {
  try {
    const channels = await getChannels();

    const projects = channels.filter(
      (channel) =>
        channel.is_channel && channel.is_private && !channel.is_general
    );

    for (const {
      id,
      context_team_id,
      name,
      is_archived,
      purpose,
    } of projects) {
      const data = {
        id,
        teamId: context_team_id,
        channelName: name,
        name: purpose.value || name,
        isArchived: is_archived || false,
      };
      updateProject("set", data);
    }
  } catch (e) {
    log.error("Error with updating projects\n", e);
  }
}
