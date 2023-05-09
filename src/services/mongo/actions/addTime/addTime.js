const DB = require("../../requests");

async function addTime(time) {
	DB.insertOne("time", {
		query: time,
	});
}

module.exports = addTime;
