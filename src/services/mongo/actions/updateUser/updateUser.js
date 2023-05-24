const DB = require("../../requests");

async function updateUser(user) {
	DB.setOne("users", {
		query: {
			id,
		},
		set: user,
		options: {
			insertNew: true,
		},
	});
}

module.exports = updateUser;
