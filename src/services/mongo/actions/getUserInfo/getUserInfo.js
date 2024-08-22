import DB from "../../requests.js";

export async function getUserInfo({ userId, teamId }) {
  return DB.getOne("users", {
    query: {
      id: userId,
      team: teamId,
    },
  });
}
