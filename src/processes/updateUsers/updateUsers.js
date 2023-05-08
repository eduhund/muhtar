const DB = require("../../services/mongo/requests");
const { slack } = require("../../services/slack/slack");

async function updateUsers() {
	const response = await slack.client.users.list();
	if (!response.ok) {
		throw new Error("Slack can't get users list");
	}

	const users = response.members.filter(
		(user) => !(user.is_bot || user.id === "USLACKBOT")
	);

	for (const user of users) {
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
}

module.exports = updateUsers;
