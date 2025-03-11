export default class Users {
  constructor(adapter) {
    this.adapter = adapter;
  }

  async findById(id, returnFields) {
    return this.adapter.findOne("users", { _id: id }, returnFields);
  }

  async findByEmail(email) {
    return this.adapter.findOne("users", { email });
  }

  async findBySlackId(slackId) {
    return this.adapter.findOne("users", { slackId });
  }

  async save(user) {
    await this.adapter.updateOne("users", user);
  }

  async create(user) {
    return this.adapter.insertOne("users", user);
  }
}
