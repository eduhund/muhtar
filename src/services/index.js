import AuthService from "./AuthService.js";
import MembershipService from "./MembershipService.js";
import ProjectService from "./ProjectService.js";
import TeamService from "./TeamService.js";
import TimeService from "./TimeService.js";
import UserService from "./UserService.js";

import {
  memberships,
  projects,
  teams,
  times,
  users,
} from "../repositories/index.js";

export const membershipService = new MembershipService(memberships);
export const projectService = new ProjectService(projects);
export const teamService = new TeamService(teams);
export const timeService = new TimeService(times);
export const userService = new UserService(users, membershipService);
export const authService = new AuthService(userService);
