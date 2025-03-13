import LoginCommand from "../../../../commands/LoginCommand.js";
import { loginFlow } from "../../../../flows/index.js";

export default async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const command = LoginCommand.fromHttp({ email, password });
    const accessToken = await loginFlow(command);
    return next({ code: 0, content: { accessToken } });
  } catch (e) {
    return next({ code: 20201, trace: e });
  }
}
