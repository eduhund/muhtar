const { sheets } = require("./google");
const config = require("../../../config.json");

// Deprecated

let users = {};
let projects = [];

/**
 * Функция обновляет списки проектов и пользователей
 * Вызывается при запуске программы, по команде /update_lists и каждый день в полночь
 */
async function updateUsersAndProjects() {
	console.log("updating lists of users and projects");
	const projectsPromise = sheets.spreadsheets.values
		.get({
			range: "Проекты!A1:B",
			spreadsheetId: config.google.tables.projects,
		})
		.then((r) => r.data.values.map((row) => row[0].trim()));

	const usersPromise = sheets.spreadsheets.values
		.get({
			range: "Люди!A2:D",
			spreadsheetId: config.google.tables.projects,
		})
		.then((r) => {
			const newUsers = {};
			for (const [fullName, nickname, sheetId, everydayReport] of r.data
				.values) {
				newUsers[nickname] = {
					fullName: fullName.trim(),
					nickname: nickname.trim(),
					sheetId: sheetId.trim(),
					everydayReport: +everydayReport === 1,
				};
			}
			return newUsers;
		});

	projects = await projectsPromise;
	users = await usersPromise;
	console.log("done updating lists of users and projects: ", users, projects);
}

module.exports = { users, projects, updateUsersAndProjects };
