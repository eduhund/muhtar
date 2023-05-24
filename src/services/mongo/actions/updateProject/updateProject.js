const DB = require("../../requests");

async function updateProject(project) {
	const { id } = project;
	DB.setOne("projects", {
		query: {
			id,
		},
		set: project,
		options: {
			insertNew: true,
		},
	});
}

module.exports = updateProject;
