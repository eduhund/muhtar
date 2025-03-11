import { timeRepository } from "../repositories/index.js";
import { dateOnlyIsoString } from "../utils/date.js";
import { generateUniqueTimestamp } from "../utils/timestamp.js";
import { BaseModel, BaseFactory } from "./BaseModel.js";

export class Time extends BaseModel {
  constructor(data = {}) {
    super();
    if (data.id) this.id = data.id;
    this.userId = data.userId ?? null;
    this.projectId = data.projectId ?? null;
    this.subproject = data.subproject ?? null;
    this.ts = data.ts || 0;
    this.date = data.date || null;
    this.duration = data.duration ?? 0;
    this.comment = data.comment ?? "";
  }

  async save() {
    const data = { ...this };
    delete data.id;
    await this.repository.updateOne(
      { _id: this.id },
      { $set: data },
      { upsert: true }
    );
    return this;
  }
}

export class TimeFactory extends BaseFactory {
  createTime(data) {
    return new Time({ ...data, repository: this.repository });
  }

  createTimes(data = []) {
    return data.map((time) => this.createTime(time));
  }
}

export default new TimeFactory(timeRepository);
