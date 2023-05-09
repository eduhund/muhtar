const log = require("../log4js/logger");
const { App } = require("@slack/bolt");

const slack = new App({
	token: process.env.SLACK_TOKEN,
	appToken: process.env.SLACK_APP_TOKEN,
	//signingSecret: process.env.SLACK_S_SECRET,
	socketMode: true,
});

async function start() {
	await slack.start(process.env.SLACK_PORT || 3000);

	log.info("Slack is running");
}

module.exports = { slack, start };
