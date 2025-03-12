import { v4 as uuidv4 } from "uuid";

import Service from "./Service.js";
import Membership from "../models/Membership.js";

export default class MembershipService extends Service {
  async createMembership(data) {
    const membership = new Membership({
      _id: uuidv4(),
      ...data,
      createdAt: new Date(),
    });
    membership.saveChanges();
    return membership;
  }

  async getMembershipById(_id) {
    const data = await this._findOne({ _id });
    return data ? new Membership(data) : null;
  }

  async getMembershipBySlackId(userId, teamId) {
    const data = await this._findOne({
      "connections.slack.userId": userId,
      "connections.slack.teamId": teamId,
    });
    return data ? new Membership(data) : null;
  }

  async getMembershipsByTeam(teamId) {
    const data = await this._findMany({ teamId });
    return data.map((membership) => new Membership(membership));
  }

  async getMembershipsByUser(userId) {
    const data = await this._findMany({ userId });
    return data.map((membership) => new Membership(membership));
  }
}
