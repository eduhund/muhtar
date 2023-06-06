const DB = require("../../requests");

async function getTimeInfo({ channelId, teamId, userId }) {
	return DB.getMany(
		"time",
		{
			query: {
				projectId: channelId,
				teamId,
				userId,
			},
		},
		{
			limit: 1,
			sort: true,
		}
	);
}

module.exports = getTimeInfo;
