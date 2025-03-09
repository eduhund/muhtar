import inviteUsers from "./inviteUsers/inviteUsers.js";
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

export const privateMethods = [
  {
    method: "post",
    path: "/inviteUsers",
    handler: inviteUsers,
    required: ["organizationId", "invites"],
  },
];

export const allMethods = [...publicMethods, ...privateMethods];
