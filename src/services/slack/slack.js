const log = require("../log4js/logger");
const { App } = require("@slack/bolt");

const slack = new App({
	token: process.env.SLACK_TOKEN,
	signingSecret: process.env.SLACK_S_SECRET,
});

async function start() {
	await slack.start(process.env.SLACK_PORT || 3000);

	log.info("Slack is running");
}

module.exports = { slack, start };
