import log from "../../services/log4js/logger.js";
import { setNewTime } from "../../services/mongo/actions.js";
import { sendEphemeral } from "../../services/slack/actions.js";

import { postData } from "../../../legacy/addToSheet.js";
import DB from "../../services/mongo/requests.js";
import config from "../../../config.json" assert { type: "json" };

async function addTimeOld(data) {
  // Deprecated
  try {
    const todayForGoogle = new Date(data.ts).toLocaleString("ru-RU");
    const dateForGoogle = new Date(data.date).toLocaleString("ru-RU");
    const user = await DB.getOne("users", { query: { id: data.userId } });
    const project = await DB.getOne("projects", {
      query: { id: data.projectId },
    });
    const projectName = data.subproject
      ? project.name + " | " + data.subproject
      : project.name;
    const record = [
      [
        todayForGoogle,
        dateForGoogle,
        user.name,
        data.comment,
        data.duration / 60,
        projectName,
      ],
    ];

    const promises = [
      postData(record, config.google.tables.general),
      postData(record, config.google.tables.general, projectName),
      postData(record, user.sheets),
      postData(record, user.sheets, projectName),
    ];

    for (const p of promises) {
      await p;
    }
    console.log("Done processing /time modal send");
  } catch (e) {
    log.warn(e);
  }
}

export async function addTime({ userId, teamId, formData }) {
  try {
    const projectName =
      formData?.projectBlock?.projectAction?.selected_option?.text?.text;
    const splitted = String(projectName).split(" | ") || [];
    const projectId = String(
      formData?.projectBlock?.projectAction?.selected_option?.value
    ).split("_")[0];
    const subproject = splitted[1] || null;
    const data = {
      ts: Date.now(),
      teamId,
      projectId,
      subproject,
      userId,
      date: new Date(
        formData?.dateBlock?.dateAction?.selected_date || undefined
      ),
      duration: Number(
        formData?.hoursBlock?.hoursAction?.selected_option?.value || 0
      ),
      comment: formData?.commentBlock?.commentAction.value,
    };
    await setNewTime(data);
    await sendEphemeral("timeSuccess", data);

    // Deprecated
    //addTimeOld(data);
  } catch (e) {
    log.error("Error with adding time to project\n", e);
  }
}
