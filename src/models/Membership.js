import BaseModel from "./BaseModel.js";

export default class Membership extends BaseModel {
  constructor(data = {}) {
    super(data._id, "memberships");
    this.userId = data.userId ?? null;
    this.email = data.email ?? null;
    this.teamId = data.teamId ?? null;
    this.role = data.role ?? null;
    this.status = data.status ?? data.userId ? "active" : "pending";
    this.connections = data.connections ?? {};
  }

  changeStatus(status) {
    this.status = status;
    this.saveChanges("status");
    return this;
  }

  changeRole(role) {
    this.role = role;
    this.saveChanges("role");
    return this;
  }

  invite() {
    return this.changeStatus("pending");
  }

  accept() {
    return this.changeStatus("active");
  }

  decline() {
    return this.changeStatus("declined");
  }

  connectTo(service, { userId, teamId }) {
    switch (service) {
      case "slack":
        this.connections.slack = {
          userId,
          teamId,
        };
        this.saveChanges("connections");
        return this;
      default:
        return this;
    }
  }
}
