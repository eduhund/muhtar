import { v4 as uuidv4 } from "uuid";
import Membership from "../models/Membership.js";

export default class MembershipRepository {
  constructor(adapter) {
    this.adapter = adapter;
  }

  async findById(id) {
    const data = await this.adapter.findOne("memberships", { id });
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
    const team = new Membership({
      id,
      email,
      userId,
      role,
      status,
      ts: Date.now(),
    });
    await team.save();
    return team;
  }
}
