import { getCollection } from "../../mongo";
import { buildQuery, getProjection } from "../../utils";

const DB = getCollection("timetracker");

export async function createTime(time) {
  return DB.insertOne(time);
}

export async function getTime({ ts }) {
  if (!ts) {
    return;
  }

  const projection = getProjection();

  return DB.findOne({ ts }, { projection });
}

export async function getTimeList({ userId, organizationId, projectId }) {
  if (!userId && !organizationId && !projectId) {
    return;
  }

  const query = buildQuery({ userId, organizationId, projectId });
  const projection = getProjection();

  return DB.findMany(query, { projection });
}

export async function setTime({ ts }, update) {
  return DB.findOneAndUpdate(
    {
      ts,
    },
    { $set: update }
  );
}
