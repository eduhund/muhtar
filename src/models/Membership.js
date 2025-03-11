import { membershipRepository } from "../repositories/index.js";
import { BaseModel } from "./BaseModel.js";

export class Membership extends BaseModel {
  constructor(data = {}) {
    super();
    if (data.id) this.id = data.id;
    this.userId = data.userId ?? null;
    this.email = data.email ?? null;
    this.teamId = data.teamId ?? null;
    this.role = data.role ?? null;
    this.status = data.status ?? data.userId ? "active" : "pending";
  }

  async invite() {
    const data = { ...this, status: "pending" };
    delete data.id;
    await this.repository.updateOne(
      { _id: this.id },
      { $set: data },
      { upsert: true }
    );
    return this;
  }

  async accept() {
    const data = { ...this, status: "active" };
    delete data.id;
    await this.repository.updateOne(
      { _id: this.id },
      { $set: data },
      { upsert: true }
    );
    return this;
  }

  async reject() {
    const data = { ...this, status: "rejected" };
    delete data.id;
    await this.repository.updateOne(
      { _id: this.id },
      { $set: data },
      { upsert: true }
    );
    return this;
  }
}

export class MembershipFactory extends BaseFactory {
  createMembership(data) {
    return new Membership({ ...data, repository: this.repository });
  }

  createMemberships(data = []) {
    return data.map((membership) => this.createMembership(membership));
  }
}

export default new MembershipFactory(membershipRepository);
