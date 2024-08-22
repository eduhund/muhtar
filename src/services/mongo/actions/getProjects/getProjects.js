import DB from "../../requests.js";

export async function getProjects({ teamId }) {
  return DB.getMany("projects", {
    query: {
      teamId,
      isArchived: false,
    },
  });
}
