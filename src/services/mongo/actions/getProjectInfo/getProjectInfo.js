const DB = require("../../requests");

async function getProjects({ channelId, teamId }) {
	return DB.getOne("projects", {
		query: {
			id: channelId,
			teamId,
		},
	});
}

module.exports = getProjects;
