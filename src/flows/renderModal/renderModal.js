import { sendModal } from "../../controllers/slack/actions/index.js";
import log from "../../utils/log.js";
import { projectService } from "../../services/index.js";

export async function renderModal({ triggerId, channelId, teamId }) {
  try {
    const projects = await projectService.getProjectsByTeam(teamId);
    const selectedProject =
      projects.filter((project) => project.id === channelId) || [];
    return sendModal("timeModal", { triggerId, projects, selectedProject });
  } catch (e) {
    log.error("Error with render modal\n", e);
  }
}
