import { sendMessage } from "../../controllers/slack/actions/index.js";
import { timeService, userService } from "../../services/index.js";
import { getPreviousWorkday, isDayWorkday } from "../../utils/isDayOff.js";
import { dateOnlyIsoString } from "../../utils/date.js";

export async function sendHoursToManager() {
  if (!(await isDayWorkday())) return;

  const freelansers = await userService.getActiveUsers({
    contractType: "freelance",
  });

  const previusWorkday = getPreviousWorkday();
  const workedHours = [];

  const timeList = await timeService.getTimetableByPeriod(
    previusWorkday,
    dateOnlyIsoString(new Date())
  );

  for (const freelancer of freelansers) {
    const timeBoard = timeList.filter((time) => time.userId === freelancer.id);

    if (timeBoard.length === 0) {
      continue;
    }

    const totalTime =
      timeBoard.reduce((prev, curr) => prev + curr.duration, 0) / 60;

    workedHours.push({
      name: freelancer.name,
      time: totalTime,
    });
  }
  const managers = ["U04RKL1GNE6", "U04RKJN88BD", "U04RYBLDAJV", "U05PBF917EW"];

  for (const manager of managers) {
    await sendMessage("dailyManagerReport", {
      channelId: manager,
      data: workedHours,
    });
  }
  return;
}
