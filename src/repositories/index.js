import { adapter } from "../controllers/mongo/mongo.js";
import Memberships from "./Memberships.js";
import Projects from "./Projects.js";
import Teams from "./Teams.js";
import Times from "./Times.js";
import Users from "./Users.js";

export const memberships = new Memberships(adapter);
export const projects = new Projects(adapter);
export const teams = new Teams(adapter);
export const times = new Times(adapter);
export const users = new Users(adapter);
