export default class Projects {
  constructor(adapter) {
    this.adapter = adapter;
  }

  async findById(id) {
    return this.adapter.findOne("projects", { id });
  }

  async findAllByTeam(teamId) {
    return this.adapter.findMany("projects", { teamId });
  }

  async create(project) {
    return this.adapter.insertOne("projects", project);
  }

  async save(project) {
    return this.adapter.updateOne("projects", project);
  }
}
