import CreateProjectFlow from "./createProject/createProject.js";
import LoginFlow from "./login/login.js";

import {
  authService,
  memberships,
  projectService,
  userService,
} from "../services/index.js";

export * from "./renderModal/renderModal.js";
export * from "./addTime/addTime.js";
export * from "./addUser/addUser.js";
export * from "./setupSubProject/setupSubProject.js";
export * from "./renameProject/renameProject.js";
export * from "./getLastTime/getLastTime.js";

export const createProjectFlow = new CreateProjectFlow({
  projectService,
  membershipService: memberships,
});

export const loginFlow = new LoginFlow({ userService, authService });
