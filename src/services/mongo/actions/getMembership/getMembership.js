import DB from "../../requests.js";

export async function getMembership({ userId, organizationId }) {
  if (!userId && !organizationId) {
    return;
  }

  return DB.getOne("memberships", {
    query: {
      userId,
      organizationId,
    },
  });
}
