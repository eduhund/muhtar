import BaseModel from "./BaseModel.js";

export default class Team extends BaseModel {
  constructor(data = {}) {
    super(data._id, "teams");
    this.name = data.name ?? "";
    this.projects = data.projects ?? [];
  }

  rename(newName) {
    this.name = newName;
    this.saveChanges("name");
    return this;
  }

  addProjectToTeam({ id }) {
    this.projects.push(id);
    this.saveChanges("projects");
    return this;
  }
}
