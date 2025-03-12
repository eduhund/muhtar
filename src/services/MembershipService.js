import { v4 as uuidv4 } from "uuid";

import Service from "./Service.js";
import Membership from "../models/Membership.js";

export default class MembershipService extends Service {
  async createMembership(data) {
    const id = uuidv4();
    const membership = new Membership({
      id,
      ...data,
      ts: Date.now(),
    });
    await this.repository.create(membership);
    return membership;
  }

  async connectMembershipToSlack(membershipId, { userId, teamId }) {
    const data = await this.repository.update(membershipId, {
      "connections.slack": { userId, teamId },
    });
    return data ? new Membership(data) : null;
  }

  async getMembershipById(id) {
    const data = await this.repository.findById(id);
    return data ? new Membership(data) : null;
  }

  async getMembershipBySlackId(userId, teamId) {
    const data = await this.repository.findBySlackId(userId, teamId);
    console.log(data);
    return data ? new Membership(data) : null;
  }

  async getMembershipsByTeam(teamId) {
    const data = await this.repository.findAllByTeamId(teamId);
    return data.map((membership) => new Membership(membership));
  }

  async getMembershipsByUser(userId) {
    const data = await this.repository.findAllByUser(userId);
    return data.map((membership) => new Membership(membership));
  }
}
