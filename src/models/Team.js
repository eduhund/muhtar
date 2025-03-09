import BaseModel from "./BaseModel.js";
export default class Team extends BaseModel {
  constructor(data = {}) {
    super();
    this.name = data.name ?? "";
    this.projects = data.projects ?? [];
  }
}
