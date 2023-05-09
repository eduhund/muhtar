function dateOnlyIsoString(date) {
	return date.toISOString().split("T")[0];
}

module.exports = { dateOnlyIsoString };
