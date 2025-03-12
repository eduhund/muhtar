import Service from "./Service.js";
import Time from "../models/Time.js";
import { dateOnlyIsoString } from "../utils/date.js";

export default class TimeService extends Service {
  async addTime({ date, ...rest }) {
    const id = Date.now();
    const time = new Time({
      id,
      date: dateOnlyIsoString(date),
      ...rest,
    });
    await this.repository.create(time);
    return;
  }

  async getTimeById(id) {
    const data = await this.repository.findById(id);
    return data ? new Time(data) : null;
  }

  async getTimetableByUser(userId) {
    const data = await this.repository.findByAllByUser(userId);
    return data.map((time) => new Time(time));
  }

  async getTimetableByProject(projectId) {
    const data = await this.repository.findAllByProject(projectId);
    return data.map((time) => new Time(time));
  }

  async getTimetableByTeam(teamId) {
    const data = await this.repository.findAllByTeam(teamId);
    return data.map((time) => new Time(time));
  }

  async getTimetableByPeriod(from, to, teamId) {
    const data = await this.repository.findAllByPeriod(from, to, teamId);
    return data.map((time) => new Time(time));
  }
}
