export default class Times {
  constructor(adapter) {
    this.adapter = adapter;
  }

  async create(time) {
    await this.adapter.insertOne("timetracker", time);
    return time;
  }

  async findById(id) {
    return this.adapter.findOne("timetracker", { id });
  }

  async findAllByProject(projectId) {
    return this.adapter.findMany("timetracker", { projectId });
  }

  async findAllByUser(userId) {
    return this.adapter.findMany("timetracker", { userId });
  }

  async findAllByTeam(teamId) {
    return this.adapter.findMany("timetracker", { teamId });
  }

  async findAllByPeriod(from, to) {
    return this.adapter.findMany("timetracker", {
      date: { $gte: from, $lt: to },
    });
  }

  async save(time) {
    return await this.adapter.updateOne("timetracker", time);
  }
}
