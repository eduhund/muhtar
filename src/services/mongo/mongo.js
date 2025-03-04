import log from "../log4js/logger.js";
import { MongoClient } from "mongodb";

const { DB_URL, DB_NAME } = process.env;

const client = new MongoClient(DB_URL);

export function getCollection(name) {
  return client.db(DB_NAME).collection(name);
}

export async function start() {
  if (!DB_URL || !DB_NAME) {
    throw new Error(
      "Database credentials is not defined. Check DB_URL and DB_NAME env variables"
    );
  }
  await client.connect();
  log.info("Connected to database");
}

export default { getCollection, start };
