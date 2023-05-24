const DB = require("../../requests");

async function updateProject(type = "set", project) {
	const { id } = project;
	if (type !== "set") delete project.id;
	const update = {
		set: type === "set" ? project : undefined,
		push: type === "push" ? project : undefined,
		pull: type === "pull" ? project : undefined,
	};
	DB.setOne("projects", {
		query: {
			id,
		},
		...update,
		options: {
			insertNew: true,
		},
	});
}

module.exports = updateProject;
