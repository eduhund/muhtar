const log = require("../../../log4js/logger");

const messageTypes = require("../../messageBuilder");

const { slack } = require("../../slack");

async function sendMessage(messageType, data) {
	const messageFn = messageTypes[messageType];
	if (messageFn) {
		await slack.client.chat.postMessage(messageFn(data));
		log.debug("Slack — Message has been sent: ", data);
	}
}

module.exports = sendMessage;
