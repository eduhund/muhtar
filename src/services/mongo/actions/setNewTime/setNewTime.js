const DB = require("../../requests");

async function setNewTime(query) {
	DB.insertOne("time", {
		query,
	});
}

module.exports = setNewTime;
