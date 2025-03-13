import CreateProjectFlow from "./createProject/createProject.js";
import LoginFlow from "./login/login.js";

import {
  authService,
  memberships,
  projects,
  users,
} from "../services/index.js";

export * from "./renderModal/renderModal.js";
export * from "./addTime/addTime.js";
export * from "./addUser/addUser.js";
export * from "./setupSubProject/setupSubProject.js";
export * from "./renameProject/renameProject.js";
export * from "./getLastTime/getLastTime.js";

export const createProjectFlow = new CreateProjectFlow({
  projects,
  memberships,
}).execute;

export const loginFlow = new LoginFlow({ users, authService }).execute;
