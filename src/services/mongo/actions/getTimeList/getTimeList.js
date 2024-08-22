import DB from "../../requests.js";

export async function getTimeList({ channelId, teamId, userId }) {
  return DB.getMany(
    "time",
    {
      query: {
        projectId: channelId,
        teamId,
        userId,
      },
    },
    {
      limit: 1,
      sort: true,
    }
  );
}
