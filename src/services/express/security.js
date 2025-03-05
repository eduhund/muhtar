import { checkToken } from "../tokenMachine/tokenMachine.js";

export async function checkAuth(req, res, next) {
  try {
    const { authorization, ["X-Api-Key"]: apiKey } = req.headers;

    if (authorization) {
      const token = authorization.replace("Bearer ", "");
      const tokenData = checkToken(token);

      if (!tokenData) return next({ code: 10103 });

      const { userId } = tokenData;
      req.data = { userId };
      return next();
    }

    /*
    if (apiKey) {
      const tokenData = await getAPIToken(apiKey);
      if (!tokenData) return next({ code: 10104 });

      const { orgId } = tokenData;
      req.data = { orgId };
      return next();
    }
    */

    return next({ code: 10103 });
  } catch (e) {
    const err = { code: 20201, trace: e };
    next(err);
  }
}
