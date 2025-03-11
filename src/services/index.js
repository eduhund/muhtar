import AuthService from "./AuthService.js";
import MembershipService from "./MembershipService.js";
import ProjectService from "./ProjectService.js";
import TeamService from "./TeamService.js";
import TimeService from "./TimeService.js";
import UserService from "./UserService.js";

import {
  membershipRepository,
  projectRepository,
  teamRepository,
  timeRepository,
  userRepository,
} from "../repositories/index.js";

export const membershipService = new MembershipService(membershipRepository);
export const projectService = new ProjectService(projectRepository);
export const teamService = new TeamService(teamRepository);
export const timeService = new TimeService(timeRepository);
export const userService = new UserService(userRepository, membershipService);
export const authService = new AuthService(userService);
