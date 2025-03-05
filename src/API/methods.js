import login from "./login/login.js";
import register from "./register/register.js";

export const publicMethods = [
  {
    method: "post",
    path: "/login",
    handler: login,
    required: ["email", "password"],
  },
  {
    method: "post",
    path: "/register",
    handler: register,
    required: ["email", "password", "firstName", "lastName"],
  },
];

export const privateMethods = [];

export const allMethods = [...publicMethods, ...privateMethods];
