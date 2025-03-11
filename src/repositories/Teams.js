import { v4 as uuidv4 } from "uuid";
import Team from "../models/Team.js";

export default class Teams {
  constructor(adapter) {
    this.adapter = adapter;
  }

  static async create(team) {
    return this.adapter.insertOne("teams", team);
  }

  async findById(id) {
    return this.adapter.findOne("teams", { id });
  }

  async save(team) {
    return this.adapter.updateOne("teams", team);
  }
}
