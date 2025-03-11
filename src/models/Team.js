import BaseModel from "./BaseModel.js";

export default class Team extends BaseModel {
  constructor(data = {}) {
    super(data);
    this.name = data.name ?? "";
    this.projects = data.projects ?? [];
  }
}
