export default class MembershipService {
  constructor(membershipRepository) {
    this.membershipRepository = membershipRepository;
  }

  static async createMembership(data) {
    return await this.membershipRepository.create(data);
  }

  static async getMembershipById(id) {
    return await this.membershipRepository.findById(id);
  }

  static async getMembershipsByTeam(teamId) {
    return await this.membershipRepository.findAllByTeamId(teamId);
  }

  static async getMembershipsByUser(userId) {
    return this.membershipRepository.findAllByUser(userId);
  }
}
