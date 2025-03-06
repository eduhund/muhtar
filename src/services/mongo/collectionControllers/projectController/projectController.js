import { getCollection } from "../../mongo";
import { getProjection } from "../../utils";

const DB = getCollection("projects");

export async function createProject(project) {
  return DB.insertOne(project);
}

export async function getProject({ projectId }) {
  if (!projectId) {
    return;
  }

  const projection = getProjection();

  return DB.findOne({ projectId }, { projection });
}

export async function getProjects({ organizationId }) {
  if (!organizationId) {
    return;
  }

  const projection = getProjection();

  return DB.findMany({ organizationId }, { projection });
}

export async function setProject({ projectId }, update) {
  return DB.findOneAndUpdate(
    {
      projectId,
    },
    { $set: update }
  );
}
