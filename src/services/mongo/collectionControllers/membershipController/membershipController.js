import { getCollection } from "../../mongo";
import { getProjection } from "../../utils";

const DB = getCollection("memberships");

export async function createMembership(membership) {
  return DB.insertOne(membership);
}

export async function getMembership({ email, userId, organizationId }) {
  if (!(email || userId) && !organizationId) {
    return;
  }

  const query = userId ? { userId } : { email };
  query.organizationId = organizationId;

  const projection = getProjection();

  return DB.findOne(query, { projection });
}

export async function getMemberships({ organizationId }) {
  if (!organizationId) {
    return;
  }

  const projection = getProjection();

  return DB.findMany({ organizationId }, { projection });
}

export async function setMembership({ email, userId, organizationId }, update) {
  const query = userId ? { userId } : { email };
  query.organizationId = organizationId;

  return DB.findOneAndUpdate(query, { $set: update });
}
