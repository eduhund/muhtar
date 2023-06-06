const DB = require("../../requests");

async function getProjectInfo({ channelId, teamId }) {
	return DB.getOne("projects", {
		query: {
			id: channelId,
			teamId,
		},
	});
}

module.exports = getProjectInfo;
