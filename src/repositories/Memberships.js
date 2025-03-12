export default class Memberships {
  constructor(adapter) {
    this.adapter = adapter;
  }

  async create(membership) {
    return this.adapter.insertOne("memberships", membership);
  }

  async findById(id) {
    return this.adapter.findOne("memberships", { id });
  }

  async findBySlackId(userId, teamId) {
    return this.adapter.findOne("memberships", {
      connections: {
        slack: { userId, teamId },
      },
    });
  }

  async findAllByEmail(email) {
    return this.adapter.findMany("memberships", { email });
  }

  async findAllByUser(userId) {
    return this.adapter.findMany("memberships", { userId });
  }

  async findAllByTeam(teamId) {
    return this.adapter.findMany("memberships", { teamId });
  }

  async save(membership) {
    await this.adapter.updateOne("memberships", membership);
    return;
  }

  async invite(membership) {
    const data = { ...membership, status: "pending" };
    delete data.id;
    await this.adapter.updateOne(
      { _id: this.id },
      { $set: data },
      { upsert: true }
    );
    return;
  }

  async accept(membership) {
    const data = { ...membership, status: "active" };
    delete data.id;
    await this.adapter.updateOne(
      { _id: this.id },
      { $set: data },
      { upsert: true }
    );
    return;
  }

  async reject(membership) {
    const data = { ...membership, status: "rejected" };
    delete data.id;
    await this.adapter.updateOne(
      { _id: this.id },
      { $set: data },
      { upsert: true }
    );
    return this;
  }
}
