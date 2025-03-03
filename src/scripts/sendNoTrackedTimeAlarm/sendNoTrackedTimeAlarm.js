import log from "../../services/log4js/logger.js";
import {
  isDayWorkday,
  getPreviousWorkday,
} from "../../services/isDayOff/isDayOff.js";
import { getTimeList, getUsers } from "../../services/mongo/actions.js";
import { sendMessage } from "../../services/slack/actions.js";

export async function sendNoTrackedTimeAlarm() {
  if (!(await isDayWorkday())) return;

  const users = await getUsers({
    sendDailyAlarm: true,
    isDeleted: false,
  });

  const previusWorkday = getPreviousWorkday();

  for (const user of users) {
    const timeBoard = await getTimeList(
      {
        userId: user.id,
        date: {
          $gte: previusWorkday,
          $lt: new Date().toISOString().split("T")[0],
        },
      },
      {
        limit: 0,
      }
    );

    if (timeBoard.length === 0) {
      await sendMessage("noTrackedTimeAlarm", {
        userId: user.id,
      });
      log.debug("Send no tracked time alarm to user ", user.name);
    }
  }
}
