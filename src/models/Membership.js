import BaseModel from "./BaseModel.js";

export default class Membership extends BaseModel {
  constructor(data = {}) {
    super(data);
    this.userId = data.userId ?? null;
    this.email = data.email ?? null;
    this.teamId = data.teamId ?? null;
    this.role = data.role ?? null;
    this.status = data.status ?? data.userId ? "active" : "pending";
  }
}
