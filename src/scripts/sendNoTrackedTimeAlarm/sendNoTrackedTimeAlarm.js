import log from "../../utils/log.js";
import { isDayWorkday, getPreviousWorkday } from "../../utils/isDayOff.js";
import { timeService, userService } from "../../services/index.js";
import { sendMessage } from "../../controllers/slack/actions/index.js";

export async function sendNoTrackedTimeAlarm() {
  if (!(await isDayWorkday())) return;

  const users = await userService.getActiveUsers({
    sendDailyAlarm: true,
  });

  const previusWorkday = getPreviousWorkday();

  const timeList = await timeService.getTimetableByPeriod(
    previusWorkday,
    dateOnlyIsoString(new Date())
  );

  for (const user of users) {
    const timeBoard = timeList.filter((time) => time.userId === user.id);

    if (timeBoard.length === 0) {
      await sendMessage("noTrackedTimeAlarm", {
        userId: user.id,
      });
      log.debug("Send no tracked time alarm to user ", user.name);
    }
  }
}
