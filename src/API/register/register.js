import { v4 as uuidv4 } from "uuid";

import {
  createMembership,
  createOrganization,
  createUser,
  getUser,
  setMembership,
} from "../../services/mongo/collectionControllers/index.js";
import { hashPassword } from "../../utils/password.js";
import { setToken } from "../../services/tokenMachine/tokenMachine.js";

export default async function register(req, res, next) {
  try {
    const { email, password, firstName, lastName, organizationId } = req.body;
    const user = await getUser({ email });
    if (user) {
      return next({ code: 10105 });
    }
    const passwordHash = await hashPassword(password);
    const newUser = {
      userId: uuidv4(),
      email,
      password: passwordHash,
      firstName,
      lastName,
      registerDate: new Date(),
    };
    await createUser(newUser);
    if (!organizationId) {
      const newOrganizationId = uuidv4();
      await createOrganization({
        organizationId: newOrganizationId,
        name: "My organization",
      });
      await createMembership({
        userId: newUser.userId,
        organizationId: newOrganizationId,
        role: "owner",
        status: "active",
      });
    } else {
      const membership = await setMembership(
        {
          userId: newUser.userId,
          organizationId,
        },
        { status: "active" }
      );

      if (!membership) {
        return next({ code: 10106 });
      }
    }
    const accessToken = setToken(newUser, req);
    return next({ code: 0, content: { accessToken } });
  } catch (e) {
    return next({ code: 20202, trace: e });
  }
}
