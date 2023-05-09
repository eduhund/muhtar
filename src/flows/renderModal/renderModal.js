const log = require("../../services/log4js/logger");
const { getProjects } = require("../../services/mongo/actions");
const { sendModal } = require("../../services/slack/actions");

async function renderModal({ triggerId, channelId, teamId }) {
	try {
		const projects = await getProjects({ teamId });
		const selectedProject =
			projects.filter((project) => project.id === channelId) || [];
		return sendModal("timeModal", { triggerId, projects, selectedProject });
	} catch (e) {
		log.error("Error with render modal\n", e);
	}
}

module.exports = renderModal;
