const log = require("../../services/log4js/logger");
const { setNewTime } = require("../../services/mongo/actions");
const { sendEphemeral } = require("../../services/slack/actions");

const { postData } = require("../../../legacy/addToSheet");
const DB = require("../../services/mongo/requests");
const config = require("../../../config.json");

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

async function addTime({ userId, teamId, formData }) {
	try {
		const projectName =
			formData?.projectBlock?.projectAction?.selected_option?.text?.text;
		const splitted = String(projectName).split(" | ") || [];
		const subproject = splitted[1] || null;
		console.log(subproject);
		const data = {
			ts: Date.now(),
			teamId,
			projectId: formData?.projectBlock?.projectAction?.selected_option?.value,
			subproject,
			userId,
			date: formData?.dateBlock?.dateAction?.selected_date,
			duration: formData?.hoursBlock?.hoursAction?.selected_option?.value,
			comment: formData?.commentBlock?.commentAction.value,
		};
		await setNewTime(data);
		await sendEphemeral("timeSuccess", data);

		// Deprecated
		addTimeOld(data);
	} catch (e) {
		log.error("Error with adding time to project\n", e);
	}
}

module.exports = addTime;
