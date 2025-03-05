import DB from "../../requests.js";

export async function getMembership({ email, userId, organizationId }) {
  if (!(email || userId) && !organizationId) {
    return;
  }

  const userQuery = userId ? { userId } : { email };

  return DB.getOne("memberships", {
    query: {
      ...userQuery,
      organizationId,
    },
  });
}
