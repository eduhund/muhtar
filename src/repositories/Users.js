export default class Users {
  constructor(adapter) {
    this.adapter = adapter;
  }

  async create(user) {
    return this.adapter.insertOne("users", user);
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
    return this.adapter.updateOne("users", user);
  }
}
