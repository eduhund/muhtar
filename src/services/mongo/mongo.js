const log = require("../log4js/logger");
const { MongoClient } = require("mongodb");

const DB_URL = process.env.DATABASE_URL;
const DB_NAME = process.env.DATABASE_NAME;

const client = new MongoClient(DB_URL);

function getCollection(name) {
	return client.db(DB_NAME).collection(name);
}

async function start() {
	await client.connect();
	log.info("Connected to database successfully");
}

module.exports = {
	start,
	getCollection,
};
