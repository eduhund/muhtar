import BaseModel from "./BaseModel.js";

export default class Project extends BaseModel {
  constructor(data = {}) {
    super(data._id, "projects");
    this.name = data.name ?? "";
    this.description = data.description ?? "";
    this.creator = data.creator ?? null;
    this.teamId = data.teamId ?? null;
    this.connections = data.connections ?? {};
  }

  rename(newName) {
    this.name = newName;
    this.saveChanges("name");
    return this;
  }

  changeDescription(newDescription) {
    this.description = newDescription;
    this.saveChanges("description");
    return this;
  }

  connectTo(service, { channelId, teamId }) {
    switch (service) {
      case "slack":
        this.connections.slack = {
          channelId,
          teamId,
        };
        this.saveChanges("connections");
        return this;
      default:
        return this;
    }
  }
}
