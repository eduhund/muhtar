import {
  getProjects,
  getTimeList,
  getUsers,
} from "../../services/mongo/actions.js";
import { sendMessage } from "../../services/slack/actions.js";

export async function sendHoursToManager() {
  const freelansers = await getUsers({
    contractType: "freelance",
    isDeleted: false,
  });

  const today = new Date();
  const yesterday = new Date(today);

  yesterday.setDate(today.getDate() - 1);

  let string = "";

  for (const freelancer of freelansers) {
    const timeBoard = await getTimeList(
      {
        userId: freelancer.id,
        date: yesterday,
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

    string += `\n• ${freelancer.name}: ${totalTime}`;
  }

  // @nebel
  await sendMessage("dailyManagerReport", {
    channelId: "U04RKL1GNE6",
    text: string,
  });

  // @pro
  await sendMessage("dailyManagerReport", {
    channelId: "U04RKJN88BD",
    text: string,
  });

  // @alex
  await sendMessage("dailyManagerReport", {
    channelId: "U04RYBLDAJV",
    text: string,
  });

  // @yury
  await sendMessage("dailyManagerReport", {
    channelId: "U05PBF917EW",
    text: string,
  });
  return;
}
