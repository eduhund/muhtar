import { adapter } from "../controllers/mongo/mongo.js";
import MembershipRepository from "./MembershipRepository.js";
import ProjectRepository from "./ProjectRepository.js";
import TeamRepository from "./TeamRepository.js";
import TimeRepository from "./TimeRepository.js";
import UserRepository from "./UserRepository.js";

export const membershipRepository = new MembershipRepository(adapter);
export const projectRepository = new ProjectRepository(adapter);
export const teamRepository = new TeamRepository(adapter);
export const timeRepository = new TimeRepository(adapter);
export const userRepository = new UserRepository(adapter);
