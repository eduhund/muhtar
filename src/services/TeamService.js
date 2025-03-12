import { v4 as uuidv4 } from "uuid";

import Service from "./Service.js";
import Team from "../models/Team.js";

export default class TeamService extends Service {
  async createTeam(data) {
    const team = new Team({
      _id: uuidv4(),
      ...data,
      createdAt: new Date(),
    });
    team.saveChanges();
    return team;
  }

  async getTeamById(_id) {
    const data = await this._findOne({ _id });
    return data ? new Team(data) : null;
  }

  async getTeamBySlackId(teamId) {
    const data = await this._findOne({ "connections.slack.teamId": teamId });
    return data ? new Team(data) : null;
  }
}
