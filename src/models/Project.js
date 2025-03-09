import BaseModel from "./BaseModel.js";

export default class Project extends BaseModel {
  constructor(data = {}) {
    super();
    this.title = data.title ?? "";
    this.description = data.description ?? "";
    this.creatorId = data.creatorId ?? null;
    this.teamId = data.teamId ?? null;
  }
}
