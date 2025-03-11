import { v4 as uuidv4 } from "uuid";
import Membership from "../models/Membership.js";

export default class Memberships {
  constructor(adapter) {
    this.adapter = adapter;
  }

  async findById(id) {
    const data = await this.adapter.findOne("memberships", { id });
    return data ? new Team(data) : null;
  }

  async findBySlackId(userId, teamId) {
    const data = await this.adapter.findOne("memberships", {
      "slack.userId": userId,
      "slack.teamId": teamId,
    });
    return data ? new Team(data) : null;
  }

  async findAllByEmail(email) {
    const data = await this.adapter.findMany("memberships", { email });
    return data.map((membership) => new this(membership));
  }

  async findAllByUser(userId) {
    const data = await this.adapter.findMany("memberships", { userId });
    return data.map((membership) => new this(membership));
  }

  async findAllByTeam(teamId) {
    const data = await this.adapter.findMany("memberships", { teamId });
    return data.map((membership) => new this(membership));
  }

  static async create({ email, userId, role, status }) {
    const id = uuidv4();
    const membership = new Membership({
      id,
      email,
      userId,
      role,
      status,
      ts: Date.now(),
    });
    return membership;
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
