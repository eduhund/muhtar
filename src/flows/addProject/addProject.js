const log = require("../../services/log4js/logger");
const {
	getProjectInfo,
	updateProject,
} = require("../../services/mongo/actions");
const { getChannelInfo, sendMessage } = require("../../services/slack/actions");

async function addProject({ channelId, teamId }) {
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

module.exports = addProject;
