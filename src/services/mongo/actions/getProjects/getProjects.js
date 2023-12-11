const DB = require("../../requests");

async function getProjects({ teamId }) {
	return DB.getMany("projects", {
		query: {
			teamId,
			isArchived: false
		},
	});
}

module.exports = getProjects;
