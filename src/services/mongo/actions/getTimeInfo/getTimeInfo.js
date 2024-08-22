import DB from "../../requests.js";

export async function getTimeInfo({ channelId, teamId, userId }) {
  return DB.getOne("time", {
    query: {
      projectId: channelId,
      teamId,
      userId,
    },
  });
}
