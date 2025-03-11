export default class Projects {
  constructor(adapter) {
    this.adapter = adapter;
  }

  async create(project) {
    return this.adapter.insertOne("projects", project);
  }

  async findById(id) {
    return this.adapter.findOne("projects", { id });
  }

  async findAllByTeam(teamId) {
    return this.adapter.findMany("projects", { teamId });
  }

  async save(project) {
    return this.adapter.updateOne("projects", project);
  }
}
