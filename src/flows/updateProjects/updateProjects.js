const log = require("../../services/log4js/logger");
const { updateProject } = require("../../services/mongo/actions");
const { getChannels } = require("../../services/slack/actions");

async function updateProjects() {
	try {
		const channels = await getChannels();

		const projects = channels.filter(
			(channel) =>
				channel.is_channel && channel.is_private && !channel.is_general
		);

		for (const project of projects) {
			updateProject(project);
		}
	} catch (e) {
		log.error("Error with updating projects\n", e);
	}
}

module.exports = updateProjects;
