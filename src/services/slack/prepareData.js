const log = require("../log4js/logger");

function incomingData(data) {
	try {
		return {
			userId:
				data?.user_id || data?.user?.id || data?.user || data?.message?.user,
			name: data?.user?.profile?.real_name,
			username:
				data?.user?.profile?.display_name ||
				data?.user_name ||
				data?.user?.username,
			isAdmin: data?.is_owner || data?.is_admin || false,
			isDeleted: data?.deleted || false,
			channelId: data?.channel_id || data?.channel?.id || data?.channel,
			triggerId: data?.trigger_id,
			teamId:
				data?.user?.team_id || data?.team_id || data?.team?.id || data?.team,
			text: data?.text,
			formData: data?.view?.state?.values,
		};
	} catch (e) {
		log.error("Error with incoming slack data\n", e);
		throw new Error("Error with incoming slack data");
	}
}

module.exports = { incomingData };
