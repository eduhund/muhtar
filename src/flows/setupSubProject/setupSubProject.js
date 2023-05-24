const log = require("../../services/log4js/logger");
const {
	getProjectInfo,
	updateProject,
} = require("../../services/mongo/actions");
const { sendEphemeral } = require("../../services/slack/actions");
const { getParams } = require("../../utils/commandParams");

async function subProject({ channelId, teamId, userId, text }) {
	try {
		const { param, value } = getParams(text);
		if (param === "-list") {
			const project = await getProjectInfo({ channelId, teamId });
			if (!project) return;
			const { subprojects, name } = project;
			if (!subprojects || subprojects.length === 0) {
				await sendEphemeral("noSubProjects", { channelId, userId, name });
				return;
			}

			await sendEphemeral("subProjectsList", {
				channelId,
				userId,
				subprojects,
			});
			return;
		}

		if (param === "-add") {
			const data = {
				id: channelId,
				subprojects: value,
			};

			await updateProject("push", data);
			await sendEphemeral("addSubProject", {
				channelId,
				userId,
				subproject: value,
			});
			return;
		}

		if (param === "-remove") {
			const data = {
				id: channelId,
				subprojects: value,
			};

			await updateProject("pull", data);
			await sendEphemeral("removeSubProject", {
				channelId,
				userId,
				subproject: value,
			});
			return;
		}
	} catch (e) {
		log.error("Error with processing subproject\n", e);
	}
}

module.exports = subProject;
