import { getUserInfo } from "../../services/mongo/actions.js";
import { setToken } from "../../services/tokenMachine/tokenMachine.js";
import { verifyPassword } from "../../utils/password.js";

export default async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await getUserInfo({ email });

    if (!user) {
      return next({ code: 10101 });
    }

    const isValidPassword = await verifyPassword(password, user.password);

    if (!isValidPassword) {
      return next({ code: 10102 });
    }
    const accessToken = setToken(newUser, req);
    return next({ code: 0, content: { accessToken } });
  } catch (e) {
    return next({ code: 20201, trace: e });
  }
}
