const log = require("../../services/log4js/logger");
const { updateUser } = require("../../services/mongo/actions");
const { getUsers } = require("../../services/slack/actions");

async function updateUsers() {
	try {
		const members = await getUsers();

		const users = members.filter(
			(user) => !(user.is_bot || user.id === "USLACKBOT")
		);

		for (const user of users) {
			updateUser(user);
		}
	} catch (e) {
		log.error("Error with updating users\n", e);
	}
}

module.exports = updateUsers;
