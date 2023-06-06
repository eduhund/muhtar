const DB = require("../../requests");

async function getTimeInfo({ channelId, teamId, userId }) {
	return DB.getOne("time", {
		query: {
			projectId: channelId,
			teamId,
			userId,
		},
	});
}

module.exports = getTimeInfo;
