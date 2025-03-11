import { v4 as uuidv4 } from "uuid";
import Time from "../models/Time.js";

export default class Times {
  constructor(adapter) {
    this.adapter = adapter;
  }

  async findById(ts) {
    const data = await this.adapter.findOne("timetracker", { ts });
    return data ? new Time(data) : null;
  }

  async findAllByProject(projectId) {
    const data = await this.adapter.findMany("timetracker", { projectId });
    return data.map((time) => new Time(time));
  }

  async findAllByUser(userId) {
    const data = await this.adapter.findMany("timetracker", { userId });
    return data.map((membership) => new Time(membership));
  }

  async findAllByTeam(teamId) {
    const data = await this.adapter.findMany("timetracker", { teamId });
    return data.map((membership) => new Time(membership));
  }

  async findAllByPeriod(from, to) {
    const data = await this.adapter.findMany("timetracker", {
      date: { $gte: from, $lt: to },
    });
    return data.map((time) => new Time(time));
  }

  async save(time) {
    await this.adapter.updateOne("timetracker", time);
  }

  static async create({
    userId,
    projectId,
    subproject,
    date,
    duration,
    comment,
  }) {
    const ts = Date.now();
    const time = new Time({
      ts,
      userId,
      projectId,
      subproject,
      date: dateOnlyIsoString(date),
      duration,
      comment,
    });
    await time.save();
    return time;
  }
}
