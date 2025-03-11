import { v4 as uuidv4 } from "uuid";

import Service from "./Service.js";
import Team from "../models/Team.js";

export default class TeamService extends Service {
  static async createTeam(data) {
    const id = uuidv4();
    const team = new Team({
      id,
      ...data,
      createdAt: new Date(),
    });
    await this.repository.create(team);
    return team;
  }

  static async getTeamById(id) {
    const data = await this.repository.findById(id);
    return data ? new Team(data) : null;
  }

  static async getTeamBySlackId(slackId) {
    const data = await this.repository.findOne({ "slack.teamId": slackId });
    return data ? new Team(data) : null;
  }
}
