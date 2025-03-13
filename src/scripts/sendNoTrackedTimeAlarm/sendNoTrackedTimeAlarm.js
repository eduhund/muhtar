import log from "../../utils/log.js";
import { isDayWorkday, getPreviousWorkday } from "../../utils/isDayOff.js";
import { timetracker, users } from "../../services/index.js";
import { sendMessage } from "../../controllers/slack/actions/index.js";

export async function sendNoTrackedTimeAlarm() {
  if (!(await isDayWorkday())) return;

  const userList = await users.getActiveUsers({
    sendDailyAlarm: true,
  });

  const previusWorkday = getPreviousWorkday();

  const timeList = await timetracker.getTimetableByPeriod(
    previusWorkday,
    dateOnlyIsoString(new Date())
  );

  for (const user of userList) {
    const timeBoard = timeList.filter((time) => time.userId === user.id);

    if (timeBoard.length === 0) {
      await sendMessage("noTrackedTimeAlarm", {
        userId: user.id,
      });
      log.debug("Send no tracked time alarm to user ", user.name);
    }
  }
}
