import CreateProjectFlow from "./createProject/createProject.js";

import { projectService, membershipService } from "../services/index.js";

export * from "./renderModal/renderModal.js";
export * from "./addTime/addTime.js";
export * from "./addUser/addUser.js";
export * from "./setupSubProject/setupSubProject.js";
export * from "./renameProject/renameProject.js";
export * from "./getLastTime/getLastTime.js";

export const createProjectFlow = new CreateProjectFlow({
  projectService,
  membershipService,
});
