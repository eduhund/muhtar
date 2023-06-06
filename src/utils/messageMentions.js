function extrudeMentions(data = "") {
	const userIds = data.match(/(?<=<@)U\w+(?=|)/g) || [];
	const projectIds = data.match(/(?<=<#)[C|G]\w+(?=|)/g) || [];

	return { userIds, projectIds };
}

module.exports = { extrudeMentions };
