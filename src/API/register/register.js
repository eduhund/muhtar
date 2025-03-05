import { v4 as uuidv4 } from "uuid";

import { createUser, getUserInfo } from "../../services/mongo/actions.js";
import { hashPassword } from "../../utils/password.js";
import { setToken } from "../../services/tokenMachine/tokenMachine.js";

export default async function register(req, res, next) {
  try {
    const { email, password, firstName, lastName } = req.body;
    const user = await getUserInfo({ email });
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
    const content = { accessToken: setToken(newUser, req) };
    return next({ code: 0, content });
  } catch (e) {
    const err = { code: 20201, trace: e };
    return next(err);
  }
}
