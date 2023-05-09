const { getProjects } = require("../../services/mongo/actions");
const { sendModal } = require("../../services/slack/actions");

async function renderModal({ triggerId, channelId, teamId }) {
	const projects = await getProjects({ teamId });
	const selectedProject =
		projects.filter((project) => project.id === channelId) || [];
	return sendModal("timeModal", { triggerId, projects, selectedProject });
}

module.exports = renderModal;
