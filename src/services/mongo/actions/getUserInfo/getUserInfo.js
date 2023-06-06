const DB = require("../../requests");

async function getUserInfo({ userId, teamId }) {
	return DB.getOne("users", {
		query: {
			id: userId,
			team: teamId,
		},
	});
}

module.exports = getUserInfo;
