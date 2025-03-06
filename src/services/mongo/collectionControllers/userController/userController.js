import { getCollection } from "../../mongo";
import { getProjection } from "../../utils";

const DB = getCollection("users");

export async function createUser(user) {
  return DB.insertOne(user);
}

export async function getUser({ userId, email }) {
  if (!userId && !email) {
    return;
  }

  const query = userId ? { userId } : { email };
  const projection = getProjection();

  return DB.findOne(query, { projection });
}

export async function getUsers({ organizationId }) {
  if (!organizationId) {
    return;
  }

  const projection = getProjection();

  return DB.findMany({ organizationId }, { projection });
}

export async function setUser({ userId }, update) {
  return DB.findOneAndUpdate(
    {
      userId,
    },
    { $set: update }
  );
}
