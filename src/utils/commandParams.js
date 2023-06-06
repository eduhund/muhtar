function getParams(text) {
	const params = text.match(/-\w+/g) || [];
	const value = text.match(/^[^-].+|[\s].+/) || [];

	return { param: params[0], value: (value[0] || "").trim() };
}

module.exports = { getParams };
