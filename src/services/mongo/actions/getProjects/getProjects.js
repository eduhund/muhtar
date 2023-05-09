const DB = require("../../requests");

async function getProjects(data) {
	const { teamId } = data;
	return DB.getMany("projects", {
		query: {
			teamId,
		},
	});
}

module.exports = getProjects;
