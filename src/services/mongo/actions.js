const getProjectInfo = require("./actions/getProjectInfo/getProjectInfo");
const getProjects = require("./actions/getProjects/getProjects");
const getTimeInfo = require("./actions/getTimeInfo/getTimeInfo");
const getTimeList = require("./actions/getTimeList/getTimeList");
const getUserInfo = require("./actions/getUserInfo/getUserInfo");
const setNewTime = require("./actions/setNewTime/setNewTime");
const updateUser = require("./actions/updateUser/updateUser");
const updateProject = require("./actions/updateProject/updateProject");

module.exports = {
	getProjectInfo,
	getProjects,
	getTimeInfo,
	getTimeList,
	getUserInfo,
	setNewTime,
	updateUser,
	updateProject,
};
