import log from "../../services/log4js/logger.js";
import { getProjects } from "../../services/mongo/actions.js";
import { sendModal } from "../../services/slack/actions.js";

export async function renderModal({ triggerId, channelId, teamId }) {
  try {
    const projects = await getProjects({ teamId });
    const selectedProject =
      projects.filter((project) => project.id === channelId) || [];
    return sendModal("timeModal", { triggerId, projects, selectedProject });
  } catch (e) {
    log.error("Error with render modal\n", e);
  }
}
