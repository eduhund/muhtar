import BaseModel from "./BaseModel.js";
export default class Membership extends BaseModel {
  constructor(data = {}) {
    super();
    this.userId = data.userId ?? null;
    this.teamId = data.teamId ?? null;
    this.role = data.role ?? null;
    this.status = data.status ?? "active";
  }

  async invite({ email, userId, teamId, role }) {
    const identifier = userId ? { userId } : { email };
    const data = {
      ...identifier,
      teamId,
      role,
      status: "pending",
    };
    return await this.add(data);
  }

  async accept({ email, userId, teamId }) {
    const identifier = userId ? { userId } : { email };
    const { id: membershipId } = await this.findOne({ ...identifier, teamId });

    if (!membershipId) {
      return null;
    }
    const data = {
      userId,
      status: "active",
    };
    return await this.update({ id: membershipId }, data);
  }

  async reject({ email, userId, teamId }) {
    const identifier = userId ? { userId } : { email };
    const { id: membershipId } = await this.findOne({ ...identifier, teamId });

    if (!membershipId) {
      return null;
    }
    const data = {
      userId,
      status: "rejected",
    };
    return await this.update({ id: membershipId }, data);
  }

  async getOne({ membershipId, email, userId, teamId }) {
    const query = membershipId ? { id: membershipId } : {};
    if (userId) {
      identifier.userId = userId;
    } else if (email) {
      identifier.email = email;
    }
    if (teamId) {
      query.teamId = teamId;
    }
    return await this.findOne(query);
  }

  async getMany({ email, userId, teamId }) {
    const query = {};
    if (userId) {
      identifier.userId = userId;
    } else if (email) {
      identifier.email = email;
    }
    if (teamId) {
      query.teamId = teamId;
    }
    return await this.findAll(query);
  }
}
