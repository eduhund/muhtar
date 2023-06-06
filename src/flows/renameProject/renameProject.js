const log = require("../../services/log4js/logger");
const { getParams } = require("../../utils/commandParams");
const { sendEphemeral } = require("../../services/slack/actions");
const { updateProject } = require("../../services/mongo/actions");

async function addTime({ channelId, userId, text }) {
	try {
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
		return;
	} catch (e) {
		log.error("Error with adding time to project\n", e);
	}
}

module.exports = addTime;
