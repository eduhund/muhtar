import { adapter } from "../controllers/mongo/mongo.js";
import AuthService from "./AuthService.js";
import MembershipService from "./MembershipService.js";
import ProjectService from "./ProjectService.js";
import TeamService from "./TeamService.js";
import TimeService from "./TimeService.js";
import UserService from "./UserService.js";

export const memberships = new MembershipService(adapter, "memberships");
export const projectService = new ProjectService(adapter, "projects");
export const teamService = new TeamService(adapter, "teams");
export const timeService = new TimeService(adapter, "timetracker");
export const userService = new UserService(adapter, "users", { memberships });
export const authService = new AuthService({ userService });
