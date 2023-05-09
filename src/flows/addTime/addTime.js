const { setNewTime } = require("../../services/mongo/actions");
const { sendEphemeral } = require("../../services/slack/actions");

async function addTime({ userId, teamId, formData }) {
	const data = {
		ts: Date.now(),
		teamId,
		projectId: formData?.projectBlock?.projectAction?.selected_option?.value,
		userId,
		date: formData?.dateBlock?.dateAction?.selected_date,
		duration: formData?.hoursBlock?.hoursAction?.selected_option?.value,
		comment: formData?.commentBlock?.commentAction.value,
	};
	await setNewTime(data);
	await sendEphemeral("timeSuccess", data);
}

module.exports = addTime;
