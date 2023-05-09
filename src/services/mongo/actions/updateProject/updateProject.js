const DB = require("../../requests");

async function updateProject(project) {
	const { id, context_team_id, name, is_archived, purpose } = project;
	DB.setOne("projects", {
		query: {
			id,
		},
		set: {
			id,
			teamId: context_team_id,
			channelName: name,
			name: purpose.value,
			isArchived: is_archived || false,
		},
		options: {
			insertNew: true,
		},
	});
}

module.exports = updateProject;
