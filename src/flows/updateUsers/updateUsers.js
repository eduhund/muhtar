import log from "../../services/log4js/logger.js";
import { updateUser } from "../../services/mongo/actions.js";
import { getUsers } from "../../services/slack/actions.js";

// Deprecated
export async function updateUsers() {
  try {
    const members = await getUsers();

    const users = members.filter(
      (user) => !(user.is_bot || user.id === "USLACKBOT")
    );

    for (const { id, team_id, profile, is_admin, is_owner, deleted } of users) {
      const data = {
        id,
        team: team_id,
        name: profile.real_name,
        username: profile.display_name,
        isAdmin: is_owner || is_admin || false,
        isDeleted: deleted || false,
      };
      updateUser(data);
    }
  } catch (e) {
    log.error("Error with updating users\n", e);
  }
}
