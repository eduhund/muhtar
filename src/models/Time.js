import BaseModel from "./BaseModel.js";

export default class Time extends BaseModel {
  constructor(data = {}) {
    super(data);
    this.userId = data.userId ?? null;
    this.projectId = data.projectId ?? null;
    this.subproject = data.subproject ?? null;
    this.ts = data.ts || 0;
    this.date = data.date || null;
    this.duration = data.duration ?? 0;
    this.comment = data.comment ?? "";
  }
}
