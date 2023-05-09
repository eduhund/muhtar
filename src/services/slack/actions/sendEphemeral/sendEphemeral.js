const log = require("../../../log4js/logger");

const messageTypes = require("../../messageBuilder");

const { slack } = require("../../slack");

async function sendEphemeral(messageType, data) {
	console.log(data);
	const messageFn = messageTypes[messageType];
	if (messageFn) {
		await slack.client.chat.postEphemeral(messageFn(data));
		log.debug("Slack — Message has been sent: ", data);
	}
}

module.exports = sendEphemeral;
