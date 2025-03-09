const ROLE_HIERARCHY = ["member", "manager", "admin", "owner"];

function canInvite(currentRole, targetRole) {
  const currentIndex = ROLE_HIERARCHY.indexOf(currentRole);
  const targetIndex = ROLE_HIERARCHY.indexOf(targetRole);
  return currentIndex > -1 && targetIndex > -1 && targetIndex < currentIndex;
}

export default async function inviteUsers(req, res, next) {
  try {
    /*
   [ const { organizationId, invites = [] } = req.body;
    const { userId } = req.data;

    const inviterMembership = await getMembership({
      userId,
      organizationId,
    });

    if (!inviterMembership || inviterMembership.status !== "active") {
      return next({ code: 10107 });
    }

    const inviterRole = inviterMembership.role;

    const results = [];

    for (const { email, role } of invites) {
      if (!canInvite(inviterRole, role)) {
        results.push({
          email,
          role,
          status: "failed",
          reason: `You cannot invite users with role '${role}'`,
        });
        continue;
      }
      const existingMembership = await getMembership({ email, organizationId });

      if (existingMembership) {
        if (existingMembership.status === "active") {
          results.push({
            email,
            role,
            status: "failed",
            reason: "User already in organization",
          });
          continue;
        }

        await setMembership(
          { _id: existingMembership._id },
          { status: "pending", role }
        );
        results.push({
          email,
          role,
          status: "updated",
        });
        continue;
      }
      const user = await getUser({ email });
      await createMembership({
        email,
        userId: user?.userId,
        organizationId,
        role: role,
        status: "pending",
      });
      results.push({
        email,
        role,
        status: "invited",
      });
    }
    return next({ code: 0, content: { results } });]
    */
  } catch (e) {
    return next({ code: 20203, trace: e });
  }
}
