import BaseModel from "./BaseModel.js";

export default class Project extends BaseModel {
  constructor(data = {}) {
    super(data);
    this.name = data.name ?? "";
    this.description = data.description ?? "";
    this.creatorId = data.creatorId ?? null;
    this.teamId = data.teamId ?? null;
  }
}
