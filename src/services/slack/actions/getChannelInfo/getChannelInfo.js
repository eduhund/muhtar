const { slack } = require("../../slack");

async function getChannelInfo(channel) {
	const response = await slack.client.conversations.info({ channel });
	if (!response.ok) {
		throw new Error("Slack can't get channel data");
	}
	return response?.channel || {};
}

module.exports = getChannelInfo;
