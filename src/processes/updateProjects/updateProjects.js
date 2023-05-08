const DB = require("../../services/mongo/requests");
const { slack } = require("../../services/slack/slack");

async function updateProjects() {
	const response = await slack.client.conversations.list({
		types: "private_channel",
		exclude_archived: true,
	});
	if (!response.ok) {
		throw new Error("Slack can't get users list");
	}

	const channels = response.channels.filter(
		(channel) => channel.is_channel && channel.is_private && !channel.is_general
	);

	for (const channel of channels) {
		const { id, context_team_id, name, is_archived, purpose } = channel;
		DB.setOne("channels", {
			query: {
				id,
			},
			set: {
				id,
				team: context_team_id,
				name,
				description: purpose.value,
				isArchived: is_archived || false,
			},
			options: {
				insertNew: true,
			},
		});
	}
}

module.exports = updateProjects;
