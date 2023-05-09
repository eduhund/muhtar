const { log } = require("../../services/log4js/logger");

const { slack } = require("./slack");

/*
function slackListenerRun() {
	slack.command("/time", async ({ payload, ack }) => {
		log.debug("Slack — New bot command: ", payload);
		await renderModal(payload);
		ack();
	});

	slack.command("/update", async ({ payload, ack }) => {
		log.debug("Slack — New bot command: ", payload);
		const data = await incomingData(payload);
		await processModals("sDmModal", data);
		ack();
	});

	slack.view("timeSubmit", async ({ body, ack }) => {
		log.debug("Slack — New view submit: ", payload);
		const data = await incomingData(body);
		await processModals("sDmSubmit", data);
		ack();
	});
}

module.exports = { slackListenerRun };
*/
