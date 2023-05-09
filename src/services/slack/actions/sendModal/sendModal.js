const { slack } = require("../../slack");
const { timeModal } = require("../../messageBuilder");

async function openModal(modalBuilder, modalData) {
	console.log(await slack.client.views.open(modalBuilder(modalData)));
}

async function sendModal(type, data) {
	switch (type) {
		case "timeModal":
			await openModal(timeModal, data);
			break;
	}
}

module.exports = sendModal;
