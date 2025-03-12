import { v4 as uuidv4 } from "uuid";

import Service from "./Service.js";
import Time from "../models/Time.js";
import { dateOnlyIsoString } from "../utils/date.js";

export default class TimeService extends Service {
  async addTime({ date, ...rest }) {
    const time = new Time({
      _id: uuidv4(),
      ts: Date.now(),
      date: dateOnlyIsoString(date),
      ...rest,
    });
    time.saveChanges();
    return time;
  }

  async getTimeById({ _id }) {
    const data = await this._findOne({ _id });
    return data ? new Time(data) : null;
  }

  async getTimeByTimestamp({ ts }) {
    const data = await this._findOne({ ts });
    return data ? new Time(data) : null;
  }

  async getTimetableByUser(userId) {
    const data = await this._findMany({ userId });
    return data.map((time) => new Time(time));
  }

  async getTimetableByProject(projectId) {
    const data = await this._findMany({ projectId });
    return data.map((time) => new Time(time));
  }

  async getTimetableByTeam(teamId) {
    const data = await this._findMany({ teamId });
    return data.map((time) => new Time(time));
  }

  async getTimetableByPeriod(from, to, teamId) {
    const data = await this._findMany({
      teamId,
      date: { $gte: from, $lt: to },
    });
    return data.map((time) => new Time(time));
  }
}
