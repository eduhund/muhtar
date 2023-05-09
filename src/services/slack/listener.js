const log = require("../../services/log4js/logger");

const { slack } = require("./slack");
const { renderModal, addTime } = require("../../flows/flows");
const { incomingData } = require("./prepareData");

function slackListenerRun() {
	slack.command("/time", async ({ payload, ack }) => {
		log.debug("Slack — New bot command: ", payload);
		const data = incomingData(payload);
		await renderModal(data);
		ack();
	});

	slack.view("timeModal", async ({ body, ack }) => {
		log.debug("Slack — New view submit: ", body);
		const data = incomingData(body);
		await addTime(data);
		ack();
	});
}

module.exports = { slackListenerRun };
