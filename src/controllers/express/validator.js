import { allMethods } from "./API/methods.js";

export function validateParams(path, req, next) {
  const data = { ...req.body, ...req.query };
  const required =
    allMethods.find((method) => method.path === path)?.required || [];
  for (const param of required) {
    if (!data[param]) {
      return next({ code: 10002 });
    }
  }
  return next();
}
