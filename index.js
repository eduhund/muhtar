require("dotenv").config();
const scheduler = require("./src/services/cron/cron");
const express = require("./src/services/express/express");
const mongo = require("./src/services/mongo/mongo");
const slack = require("./src/services/slack/slack");
const { auth } = require("./src/services/google/google");
const { updateUsers, updateProjects } = require("./src/flows/flows");
const { slackListenerRun } = require("./src/services/slack/listener");

(async () => {
	await express.start();
	await mongo.start();
	await slack.start();
	slackListenerRun();
	await auth();
	//await updateUsers();
	//await updateProjects();
	await scheduler.schedule();
})();
