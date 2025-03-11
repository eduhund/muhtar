import { v4 as uuidv4 } from "uuid";

import Service from "./Service.js";
import Project from "../models/Project.js";

export default class ProjectService extends Service {
  async createProject(data) {
    const project = new Project({
      id: uuidv4(),
      ...data,
      createdAt: new Date(),
    });
    await this.repository.create(project);
    return project;
  }

  async getProjectById(id) {
    const data = await this.repository.findById(id);
    return data ? new Project(data) : null;
  }

  async getProjectBySlackId(channelId) {
    const data = await this.repository.findOne({
      "slack.channelId": channelId,
    });
    return data ? new Project(data) : null;
  }

  async getProjectsByTeam(teamId) {
    const data = await this.repository.findByTeamId(teamId);
    return data.map((project) => new Project(project));
  }
}
