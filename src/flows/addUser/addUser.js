import log from "../../services/log4js/logger.js";
import { updateUser } from "../../services/mongo/actions.js";

export async function addUser({
  userId,
  name,
  username,
  isAdmin,
  isDeleted,
  teamId,
}) {
  try {
    const data = {
      id: userId,
      team: teamId,
      name,
      username,
      isAdmin,
      isDeleted,
    };
    await updateUser(data);
    log.info("New user was added:\n", data);
  } catch (e) {
    log.error("Error with adding project info to bot\n", e);
  }
}
