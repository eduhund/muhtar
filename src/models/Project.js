import { projectRepository } from "../repositories/index.js";
import { BaseModel } from "./BaseModel.js";

export class Project extends BaseModel {
  constructor(data = {}) {
    super();
    if (data.id) this.id = data.id;
    this.name = data.name ?? "";
    this.description = data.description ?? "";
    this.creatorId = data.creatorId ?? null;
    this.teamId = data.teamId ?? null;
  }
}

export class ProjectFactory extends BaseFactory {
  createProject(data) {
    return new Project({ ...data, repository: this.repository });
  }

  createProjects(data = []) {
    return data.map((project) => this.createProject(project));
  }
}

export default new ProjectFactory(projectRepository);
