import DB from "../../requests.js";

export async function getProjectInfo({ channelId, teamId }) {
  return DB.getOne("projects", {
    query: {
      id: channelId,
      teamId,
    },
  });
}
