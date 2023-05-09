const getUsers = require("./actions/getUsers/getUsers");
const getChannels = require("./actions/getChannels/getChannels");

const sendMessage = require("./actions/sendMessage/sendMessage");
const sendEphemeral = require("./actions/sendEphemeral/sendEphemeral");
const sendModal = require("./actions/sendModal/sendModal");

module.exports = {
	getUsers,
	getChannels,
	sendMessage,
	sendEphemeral,
	sendModal,
};
