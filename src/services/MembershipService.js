import { v4 as uuidv4 } from "uuid";
import Service from "./Service.js";
import Membership from "../models/Membership.js";

export default class MembershipService extends Service {
  static async createMembership(data) {
    const id = uuidv4();
    const membership = new Membership({
      id,
      ...data,
      ts: Date.now(),
    });
    await this.repository.create(membership);
    return membership;
  }

  static async getMembershipById(id) {
    const data = await this.repository.findById(id);
    return data ? new Membership(data) : null;
  }

  static async getMembershipBySlackId(userId, teamId) {
    const data = await this.repository.findBySlackId(userId, teamId);
    return data ? new Membership(data) : null;
  }

  static async getMembershipsByTeam(teamId) {
    const data = await this.repository.findAllByTeamId(teamId);
    return data.map((membership) => new Membership(membership));
  }

  static async getMembershipsByUser(userId) {
    const data = await this.repository.findAllByUser(userId);
    return data.map((membership) => new Membership(membership));
  }
}
