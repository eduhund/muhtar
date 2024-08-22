import log from "../log4js/logger.js";
import { MongoClient } from "mongodb";

const DB_URL = process.env.DATABASE_URL;
const DB_NAME = process.env.DATABASE_NAME;

const client = new MongoClient(DB_URL);

export function getCollection(name) {
  return client.db(DB_NAME).collection(name);
}

export async function start() {
  await client.connect();
  log.info("Connected to database");
}

export default { getCollection, start };
