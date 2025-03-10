import { v4 as uuidv4 } from "uuid";
import Project from "../models/Project.js";

export default class ProjectRepository {
  constructor(adapter) {
    this.adapter = adapter;
  }

  async findById(id) {
    const data = await this.adapter.findOne("projects", { id });
    return data ? new Project(data) : null;
  }

  async findAllByTeam(teamId) {
    const data = await this.adapter.findMany("projects", { teamId });
    return data.map((project) => new Project(project));
  }

  async create({ title, creatorId, teamId }) {
    const project = new Project({
      id: uuidv4(),
      title,
      creatorId,
      teamId,
      createdAt: new Date(),
    });
    await this.adapter.insertOne("projects", project);
    return project;
  }
}
