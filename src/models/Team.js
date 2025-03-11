import { teamRepository } from "../repositories/index.js";
import { BaseModel } from "./BaseModel.js";

export class Team extends BaseModel {
  constructor(data = {}) {
    super();
    if (data.id) this.id = data.id;
    this.name = data.name ?? "";
    this.projects = data.projects ?? [];
  }

  async save() {
    const data = { ...this };
    delete data.id;
    await this.repository.updateOne(
      { _id: this.id },
      { $set: data },
      { upsert: true }
    );
    return this;
  }
}

export class TeamFactory extends BaseFactory {
  createTeam(data) {
    return new Team({ ...data, repository: this.repository });
  }

  createTeams(data = []) {
    return data.map((team) => this.createTeam(team));
  }
}

export default new TeamFactory(teamRepository);
