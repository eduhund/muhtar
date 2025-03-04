import auth from "./auth/auth.js";

export default [
  {
    method: "get",
    path: "/auth",
    handler: auth,
  },
];
