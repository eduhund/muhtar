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
    const data = await this.adapter.find("projects", { teamId });
    return data.map((project) => new Project(project));
  }

  static async create({ title, description, creatorId, teamId }) {
    const id = uuidv4();
    const project = new Project({
      id,
      title,
      description,
      creatorId,
      teamId,
      createdAt: new Date(),
    });
    await project.save();
    return project;
  }
}
