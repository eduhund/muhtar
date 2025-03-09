import { dateOnlyIsoString } from "../utils/date.js";
import { generateUniqueTimestamp } from "../utils/timestamp.js";
import BaseModel from "./BaseModel.js";

export default class Time extends BaseModel {
  constructor(data = {}) {
    super();
    this.userId = data.userId ?? null;
    this.projectId = data.projectId ?? null;
    this.subproject = data.subproject ?? null;
    this.ts = generateUniqueTimestamp();
    this.date = dateOnlyIsoString(new Date(data.date ?? Date.now()));
    this.duration = data.duration ?? 0;
    this.comment = data.comment ?? "";
  }
}
