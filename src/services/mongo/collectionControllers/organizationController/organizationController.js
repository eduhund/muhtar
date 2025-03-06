import { getCollection } from "../../mongo";
import { getProjection } from "../../utils";

const DB = getCollection("organizations");

export async function createOrganization(organization) {
  return DB.insertOne(organization);
}

export async function getOrganization({ organizationId }) {
  if (!organizationId) {
    return;
  }

  const projection = getProjection();

  return DB.findOne({ organizationId }, { projection });
}

export async function getOrganizations({ userId }) {
  if (!userId) {
    return;
  }

  const projection = getProjection();

  return DB.findMany({ userId }, { projection });
}

export async function setProject({ organizationId }, update) {
  return DB.findOneAndUpdate(
    {
      organizationId,
    },
    { $set: update }
  );
}
