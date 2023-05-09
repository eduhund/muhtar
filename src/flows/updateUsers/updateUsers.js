const { updateUser } = require("../../services/mongo/actions");
const { getUsers } = require("../../services/slack/actions");

async function updateUsers() {
	const members = await getUsers();

	const users = members.filter(
		(user) => !(user.is_bot || user.id === "USLACKBOT")
	);

	for (const user of users) {
		updateUser(user);
	}
}

module.exports = updateUsers;
