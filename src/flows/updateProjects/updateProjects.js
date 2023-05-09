const { updateProject } = require("../../services/mongo/actions");
const { getChannels } = require("../../services/slack/actions");

async function updateProjects() {
	const channels = await getChannels();

	const projects = channels.filter(
		(channel) => channel.is_channel && channel.is_private && !channel.is_general
	);

	for (const project of projects) {
		updateProject(project);
	}
}

module.exports = updateProjects;
