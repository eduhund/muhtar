import DB from "../../requests.js";

export async function createUser(query) {
  DB.insertOne("users", {
    query,
  });
}
