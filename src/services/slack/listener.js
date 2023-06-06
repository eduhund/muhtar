const log = require("../../services/log4js/logger");

const { slack } = require("./slack");
const {
	renderModal,
	addTime,
	addProject,
	addUser,
	setupSubProject,
	renameProject,
} = require("../../flows/flows");
const { incomingData } = require("./prepareData");

const botId = process.env.SLACK_BOT_ID;

function slackListenerRun() {
	slack.command("/time", async ({ payload, ack }) => {
		log.debug("Slack — New bot command: ", payload);
		const data = incomingData(payload);
		await renderModal(data);
		ack();
	});

	slack.command("/subprj", async ({ payload, ack }) => {
		log.debug("Slack — New bot command: ", payload);
		const data = incomingData(payload);
		await setupSubProject(data);
		ack();
	});

	slack.command("/rename_prj", async ({ payload, ack }) => {
		log.debug("Slack — New bot command: ", payload);
		const data = incomingData(payload);
		await renameProject(data);
		ack();
	});

	slack.view("timeModal", async ({ body, ack }) => {
		log.debug("Slack — New view submit: ", body);
		const data = incomingData(body);
		await addTime(data);
		ack();
	});

	slack.event("member_joined_channel", async ({ event }) => {
		if (event.user !== botId) {
			return;
		}
		log.debug("Slack — Bot added to new channel: ", event);
		const data = incomingData(event);
		await addProject(data);
	});

	slack.event("team_join", async ({ event }) => {
		log.debug("Slack — New person inda house: ", event);
		const data = incomingData(event);
		await addUser(data);
	});
}

module.exports = { slackListenerRun };
