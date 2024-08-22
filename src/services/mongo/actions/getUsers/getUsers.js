import DB from "../../requests.js";

export async function getUsers(query) {
  return DB.getMany("users", { query });
}
