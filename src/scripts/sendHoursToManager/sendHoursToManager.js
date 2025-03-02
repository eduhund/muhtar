import {
  getPreviousWorkday,
  isDayWorkday,
} from "../../services/isDayOff/isDayOff.js";
import {
  getProjects,
  getTimeList,
  getUsers,
} from "../../services/mongo/actions.js";
import { sendMessage } from "../../services/slack/actions.js";

export async function sendHoursToManager() {
  if (!(await isDayWorkday())) return;

  const freelansers = await getUsers({
    contractType: "freelance",
    isDeleted: false,
  });

  const previusWorkday = getPreviousWorkday();
  const workedHours = [];

  for (const freelancer of freelansers) {
    const timeBoard = await getTimeList(
      {
        userId: freelancer.id,
        date: previusWorkday,
      },
      {
        limit: 0,
      }
    );

    if (timeBoard.length === 0) {
      continue;
    }

    const totalTime =
      timeBoard.reduce((prev, curr) => prev + curr.duration, 0) / 60;

    workedHours.push({
      name: freelancer,
      time: totalTime,
    });
  }

  // @nebel
  await sendMessage("dailyManagerReport", {
    channelId: "U04RKL1GNE6",
    data: workedHours,
  });

  // @pro
  await sendMessage("dailyManagerReport", {
    channelId: "U04RKJN88BD",
    data: workedHours,
  });

  // @alex
  await sendMessage("dailyManagerReport", {
    channelId: "U04RYBLDAJV",
    data: workedHours,
  });

  // @yury
  await sendMessage("dailyManagerReport", {
    channelId: "U05PBF917EW",
    data: workedHours,
  });
  return;
}
