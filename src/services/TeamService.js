import { v4 as uuidv4 } from "uuid";

import Service from "./Service.js";
import Team from "../models/Team.js";

export default class TeamService extends Service {
  async createTeam(data) {
    const id = uuidv4();
    const team = new Team({
      id,
      ...data,
      createdAt: new Date(),
    });
    await this.repository.create(team);
    return team;
  }

  async connectTeamToSlack(teamId, slackData) {
    const data = await this.repository.update(teamId, {
      "connections.slack": slackData,
    });
    return data ? new Team(data) : null;
  }

  async getTeamById(id) {
    const data = await this.repository.findById(id);
    return data ? new Team(data) : null;
  }

  async getTeamBySlackId(slackId) {
    const data = await this.repository.findOne({ "slack.teamId": slackId });
    return data ? new Team(data) : null;
  }
}
