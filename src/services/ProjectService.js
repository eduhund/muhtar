import { v4 as uuidv4 } from "uuid";

import Service from "./Service.js";
import Project from "../models/Project.js";

export default class ProjectService extends Service {
  async createProject(data) {
    const project = new Project({
      _id: uuidv4(),
      ...data,
      createdAt: new Date(),
    });
    project.saveChanges();
    return project;
  }

  async getProjectById(_id) {
    const data = await this._findOne({ _id });
    return data ? new Project(data) : null;
  }

  async getProjectBySlackId(channelId, teamId) {
    const data = await this._findOne({
      "connections.slack.channelId": channelId,
      "connections.slack.teamId": teamId,
    });
    return data ? new Project(data) : null;
  }

  async getProjectsByTeam(teamId) {
    const data = await this._findMany({ teamId });
    return data.map((project) => new Project(project));
  }
}
