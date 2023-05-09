const DB = require("../../requests");

async function updateUser(user) {
	const { id, team_id, profile, is_admin, is_owner, deleted } = user;
	DB.setOne("users", {
		query: {
			id,
		},
		set: {
			id,
			team: team_id,
			name: profile.real_name,
			username: profile.display_name,
			isAdmin: is_owner || is_admin || false,
			isDeleted: deleted || false,
		},
		options: {
			insertNew: true,
		},
	});
}

module.exports = updateUser;
