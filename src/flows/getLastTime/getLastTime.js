import log from "../../utils/log.js";
//import { getParams } from "../../utils/commandParams.js";
//import { sendEphemeral } from "../../services/slack/actions.js";
/*
import {
  getTimeList,
  getProjectInfo,
  getUserInfo,
} from "../../services/mongo/actions.js";
*/
//import { extrudeMentions } from "../../utils/messageMentions.js";

function getDate(date) {
  if (typeof date === "number") {
    return new Date(date).toLocaleDateString("ru-RU", {
      month: "long",
      day: "numeric",
    });
  } else {
    return new Date(Date.parse(date)).toLocaleDateString("ru-RU", {
      month: "long",
      day: "numeric",
    });
  }
}

async function getTime(userId, channelId, teamId) {
  const time = (await getTimeList({ channelId, userId, teamId }))[0];
  const project = await getProjectInfo({ channelId, teamId });
  const user = await getUserInfo({ userId, teamId });
  if (!time) {
    return false;
  }
  return {
    projectName: project?.name,
    userName: user?.name,
    duration: (time?.duration || 0) / 60,
    date: getDate(time?.ts),
    workDate: getDate(time?.date),
    comment: time?.comment,
  };
}

export async function getLastTime({ channelId, userId, teamId, text }) {
  try {
    /*
    const { value } = getParams(text);
    const { userIds = [] } = extrudeMentions(value);
    if (userIds.length === 0) {
      const data = await getTime(userId, channelId, teamId);
      await sendEphemeral("getMyLastTime", {
        channelId,
        userId,
        data,
      });
    } else {
      for (const targetUserId of userIds) {
        const data = await getTime(targetUserId, channelId, teamId);
        if (!data) {
          await sendEphemeral("userNoTime", {
            channelId,
            userId,
          });
        } else {
          await sendEphemeral("getUserLastTime", {
            channelId,
            userId,
            data,
          });
        }
      }
    }
    return true;
    */
  } catch (e) {
    log.error("Error with getting last time to user\n", e);
  }
}
