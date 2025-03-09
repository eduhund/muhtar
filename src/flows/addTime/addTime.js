import log from "../../utils/log.js";
//import { setNewTime } from "../../services/mongo/actions.js";
//import { sendEphemeral } from "../../controllers/slack/actions.js";

export async function addTime({ userId, teamId, formData }) {
  try {
    /*
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
      date:
        formData?.dateBlock?.dateAction?.selected_date ||
        new Date().toISOString().split("T")[0],
      duration: Number(
        formData?.hoursBlock?.hoursAction?.selected_option?.value || 0
      ),
      comment: formData?.commentBlock?.commentAction.value,
    };
    await setNewTime(data);
    await sendEphemeral("timeSuccess", data);
    */
  } catch (e) {
    log.error("Error with adding time to project\n", e);
  }
}
