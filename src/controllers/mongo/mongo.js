import { MongoClient } from "mongodb";

import MongoAdapter from "./adapter.js";
import log from "../../utils/log.js";

const { DB_URL, DB_NAME } = process.env;

const client = new MongoClient(DB_URL);
const mainDB = client.db(DB_NAME);

export const adapter = new MongoAdapter(mainDB);

export async function connect() {
  if (!DB_URL || !DB_NAME) {
    throw new Error(
      "Database credentials is not defined. Check DB_URL and DB_NAME env variables"
    );
  }
  await client.connect();
  log.info("Connected to database");
}
