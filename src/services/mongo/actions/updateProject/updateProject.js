const DB = require("../../requests");

async function updateProject(project) {
	const { id, context_team_id, name, is_archived, purpose } = project;
	DB.setOne("channels", {
		query: {
			id,
		},
		set: {
			id,
			team: context_team_id,
			name,
			description: purpose.value,
			isArchived: is_archived || false,
		},
		options: {
			insertNew: true,
		},
	});
}

module.exports = updateProject;
