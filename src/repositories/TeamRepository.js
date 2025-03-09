import { v4 as uuidv4 } from "uuid";
import Team from "../models/Team.js";

export default class TeamRepository {
  constructor(adapter) {
    this.adapter = adapter;
  }

  async findById(id) {
    const data = await this.adapter.findOne("teams", { id });
    return data ? new Team(data) : null;
  }

  static async create({ name, creatorId }) {
    const id = uuidv4();
    const team = new Team({
      id,
      name,
      creatorId,
      createdAt: new Date(),
    });
    await team.save();
    return team;
  }
}
