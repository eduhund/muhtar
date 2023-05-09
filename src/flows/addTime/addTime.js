const log = require("../../services/log4js/logger");
const { setNewTime } = require("../../services/mongo/actions");
const { sendEphemeral } = require("../../services/slack/actions");

const { postData } = require("../../../legacy/addToSheet");
const DB = require("../../services/mongo/requests");
const config = require("../../../config.json");

async function addTime({ userId, teamId, formData }) {
	try {
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

		// Deprecated
		const todayForGoogle = new Date(data.ts).toLocaleString("ru-RU");
		const dateForGoogle = new Date(data.date).toLocaleString("ru-RU");
		const user = await DB.getOne("users", { query: { id: userId } });
		const project = await DB.getOne("projects", {
			query: { id: data.projectId },
		});
		const record = [
			[
				todayForGoogle,
				dateForGoogle,
				user.name,
				data.comment,
				data.duration / 60,
				project.name,
			],
		];

		const promises = [
			postData(record, config.google.tables.general),
			postData(record, config.google.tables.general, project.name),
			postData(record, user.sheets),
			postData(record, user.sheets, project.name),
		];

		for (const p of promises) {
			await p;
		}
		console.log("Done processing /time modal send");
	} catch (e) {
		log.error("Error with adding time to project\n", e);
	}
}

module.exports = addTime;
