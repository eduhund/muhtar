const getUsers = require("./actions/getUsers/getUsers");
const getChannels = require("./actions/getChannels/getChannels");
const getChannelInfo = require("./actions/getChannelInfo/getChannelInfo");

const sendMessage = require("./actions/sendMessage/sendMessage");
const sendEphemeral = require("./actions/sendEphemeral/sendEphemeral");
const sendModal = require("./actions/sendModal/sendModal");

module.exports = {
	getUsers,
	getChannels,
	getChannelInfo,
	sendMessage,
	sendEphemeral,
	sendModal,
};
