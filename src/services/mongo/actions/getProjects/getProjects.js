import DB from "../../requests.js";

export async function getProjects(query = {}) {
  query.isArchived = false;
  return DB.getMany("projects", { query });
}
