require("dotenv").config();
const fs = require("fs");
const scheduler = require("./src/services/cron/cron");

const express = require("./src/services/express/express");
const mongo = require("./src/services/mongo/mongo");
const { sheets, auth } = require("./src/services/google/google");

const config = require("./config.json");

let users = {};
let projects = [];
const timezoneOffset = new Date().getTimezoneOffset();

/**
 * Функция добавляет к гугл-таблице строки в заданный лист
 * Если лист не указан, берется первый (с gid=0)
 * @param values(any[][]) -- строки, которые нужно добавить (состоят из ячеек)
 * @param spreadsheetId(string) -- id таблицы (ссылка на таблицу выглядит как https://docs.google.com/spreadsheets/d/{spreadsheetId})
 * @param sheetName(string) -- имя листа в таблице, может отсутствовать
 */
async function postData(values, spreadsheetId, sheetName) {
	console.log(
		"appending ",
		values,
		" to https://docs.google.com/spreadsheets/d/" + spreadsheetId,
		" sheet ",
		sheetName
	);
	const prefix = sheetName ? sheetName + "!" : "";
	const params = {
		range: prefix + "A2:A",
		spreadsheetId,
		valueInputOption: "RAW",
		insertDataOption: "INSERT_ROWS",
		requestBody: { values },
	};
	try {
		await sheets.spreadsheets.values.append(params);
	} catch (e) {
		// Если не получилось сохранить строки один раз, возможно, лист не существует
		// Попытаемся создать лист
		await sheets.spreadsheets.batchUpdate({
			spreadsheetId,
			resource: {
				requests: [
					{
						addSheet: {
							properties: {
								title: sheetName,
							},
						},
					},
				],
			},
		});
		// И добавить строки еще раз
		await sheets.spreadsheets.values.append(params);
	}
	console.log("done appending values");
}

/**
 * Функция обновляет списки проектов и пользователей
 * Вызывается при запуске программы, по команде /update_lists и каждый день в полночь
 */
async function updateUsersAndProjects() {
	console.log("updating lists of users and projects");
	const projectsPromise = sheets.spreadsheets.values
		.get({
			range: "Проекты!A1:A",
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

/**
 * Функция возвращает суммарное время работы над проектом из гугл-таблиц (ячейка G1 или H1)
 * @param currentOrLast('current'|'last') -- ячейка G1 или H1
 * @param project(string) -- называние проекта, оно же -- название листа в общей таблице
 */
async function fetchSummaryTime(currentOrLast, project) {
	console.log(
		"fetching summary ",
		currentOrLast,
		" time for project " + project
	);
	const cell = currentOrLast === "current" ? "G1" : "H1";
	let result;
	try {
		const response = await sheets.spreadsheets.values.get({
			range: project + "!" + cell + ":" + cell,
			spreadsheetId: config.google.tables.general,
		});
		result = +response.data.values[0][0];
	} catch (err) {
		result = 0;
	}
	console.log("done fetching summary time");
	return result;
}

/**
 * Функция возвращает строковое представление даты в формате YYYY-MM-DD
 * @param date(Date) -- дата
 * @returns isoString(string) -- строковое представление даты в формате YYYY-MM-DD
 */
function dateOnlyIsoString(date) {
	return date.toISOString().split("T")[0];
}

/**
 * Функция создает описание модального окна для Slack
 * @param projects(string[]) -- список проектов, которые нужно включить в представление
 * @returns viewPayload(object) -- объект, JSON-представление которого можно использовать в Slack API для создания модального окна
 */
function generateModal(projects) {
	const offDays = JSON.parse(fs.readFileSync(config.paths.day_off));
	const today = new Date();
	/**
        const yesterday = new Date()
        // Поиск предыдущего рабочего дня
        do {
          yesterday.setHours(-1)
        } while (offDays[dateOnlyIsoString(yesterday)])
        **/
	const template = {
		type: "modal",
		title: {
			type: "plain_text",
			text: "Time Manager",
			emoji: true,
		},
		submit: {
			type: "plain_text",
			text: "Отправить",
			emoji: true,
		},
		close: {
			type: "plain_text",
			text: "Отмена",
			emoji: true,
		},
		blocks: [
			{
				type: "input",
				block_id: "dateBlock",
				element: {
					type: "datepicker",
					action_id: "dateAction",
					// Считаем, что пользователь по-умолчанию заполняет отчет за сегодня
					initial_date: dateOnlyIsoString(today),
					placeholder: {
						type: "plain_text",
						text: "Выберите дату",
						emoji: true,
					},
				},
				label: {
					type: "plain_text",
					text: "Когда вы работали?",
					emoji: true,
				},
			},
			{
				type: "input",
				block_id: "projectBlock",
				element: {
					type: "static_select",
					action_id: "projectAction",
					options: [],
					placeholder: {
						type: "plain_text",
						text: "Выберите проект",
						emoji: true,
					},
				},
				label: {
					type: "plain_text",
					text: "Над каким проектом?",
					emoji: true,
				},
			},
			{
				type: "input",
				block_id: "hoursBlock",
				element: {
					type: "static_select",
					action_id: "hoursAction",
					options: [],
					placeholder: {
						type: "plain_text",
						text: "Выберите число",
						emoji: true,
					},
				},
				label: {
					type: "plain_text",
					text: "Сколько часов?",
					emoji: true,
				},
			},
			{
				type: "input",
				block_id: "commentBlock",
				element: {
					type: "plain_text_input",
					action_id: "commentAction",
					multiline: true,
				},
				label: {
					type: "plain_text",
					text: "Опишите, что вы делали",
					emoji: true,
				},
			},
		],
	};

	for (const p of projects) {
		template.blocks[1].element.options.push({
			text: {
				type: "plain_text",
				text: p,
			},
			value: p,
		});
	}

	for (let h = 0.5; h <= 10; h += 0.5) {
		template.blocks[2].element.options.push({
			text: {
				type: "plain_text",
				text: "" + h,
			},
			value: "" + h,
		});
	}

	return template;
}

/**
 * Обработчик команды /time
 * @param req(Request) -- NodeJS-запрос
 * @param res(Response) -- NodeJS-ответ
 */
async function handleTimeCommand(req, res) {
	console.log("processing /time command");
	// TODO: изменить проверку того, что запрос пришел от Slack
	// https://api.slack.com/docs/verifying-requests-from-slack
	if (req.body.token !== credentials.slack.verification) {
		console.log("invalid token: ", req.body.token);
		res.status(400).end();
		return;
	}
	res.type("text");
	res.write("Сейчас появится модальное окно");
	res.status(200).end();
	console.log(
		await request.post("https://slack.com/api/views.open", {
			headers: {
				Authorization: "Bearer " + credentials.slack.token,
			},
			json: {
				trigger_id: req.body.trigger_id,
				view: generateModal(projects),
			},
		})
	);
	console.log("done processing /time command");
}

/**
 * Обработчик команды /update_lists
 * @param req(Request) -- NodeJS-запрос
 * @param res(Response) -- NodeJS-ответ
 */
async function handleUpdateListsCommand(req, res) {
	console.log("processing /update_lists command");
	if (req.body.token !== credentials.slack.verification) {
		console.log("invalid token: ", req.body.token);
		res.status(400).end();
		return;
	}
	res.type("text");
	res.write("Обновляю списки проектов и пользователей");
	res.status(200).end();

	await updateUsersAndProjects();
	await request.post("https://slack.com/api/chat.postMessage", {
		headers: {
			Authorization: "Bearer " + credentials.slack.token,
		},
		json: {
			channel: req.body.user_id,
			text: "Готово! Списки обновлены",
		},
	});
	console.log("done processing /update_lists command");
}

/**
 * Обработчик отправки формы команды /time
 * @param payload(object) -- Slack Payload
 */
async function handleTimeModalSend(payload) {
	console.log("processing /time modal send");
	const { values } = payload.view.state;
	const allUsers = users;
	const nickname = payload.user.username;
	const user = allUsers[nickname];

	if (!values.dateBlock) {
		console.log("missing field: date");
		return;
	}
	const date = new Date(values.dateBlock.dateAction.selected_date);

	if (!values.projectBlock) {
		console.log("missing field: project");
		return;
	}
	const project = values.projectBlock.projectAction.selected_option.value;

	if (!values.hoursBlock) {
		console.log("missing field: hours");
		return;
	}
	const hours = +values.hoursBlock.hoursAction.selected_option.value;

	if (!values.commentBlock) {
		console.log("missing field: comment");
		return;
	}
	const comment = values.commentBlock.commentAction.value;

	// Даты в таблице записываются в каком-то странном виде
	// Имеет смысл привести их к одному виду (напр. ISO)
	// Но в целях совместимости оставим их такими
	const todayForGoogle = new Date().toLocaleString("en-US");
	const dateForGoogle = date.toLocaleString("en-GB", {
		year: "numeric",
		month: "numeric",
		day: "numeric",
	});
	const record = [
		[todayForGoogle, dateForGoogle, user.fullName, comment, hours, project],
	];

	// Еее! 5 строчек бизнес-логики!
	const timeSpent = (await fetchSummaryTime("current", project)) + hours;
	const timeLastCounter = (await fetchSummaryTime("last", project)) - timeSpent;
	const responseText = `${user.fullName} (@${
		user.nickname
	}), спасибо за информацию о ${dateForGoogle} о проекте ${project}.
Всего потрачено: ${timeSpent} часов.
${
	timeLastCounter > 0
		? `Осталось времени: ${timeLastCounter}`
		: " ВНИМАНИЕ! Скажите Роме, что ВРЕМЕНИ БОЛЬШЕ НЕТ"
}`;

	// Асинхронно отправляем данные во все нужные таблицы и ответ пользователю
	// batchUpdate не сработает, т.к. он работает только с одной таблицей, увы
	const promises = [
		postData(record, config.google.tables.general),
		postData(record, config.google.tables.general, project),
		postData(record, user.sheetId),
		postData(record, user.sheetId, project),
		request.post("https://slack.com/api/chat.postMessage", {
			headers: {
				Authorization: "Bearer " + credentials.slack.token,
			},
			json: {
				channel: payload.user.id,
				text: responseText,
			},
		}),
	];

	// Ждем все промисы
	for (const p of promises) {
		await p;
	}
	console.log("done processing /time modal send");
}

/**
 * Обработчик интерактивных событий Slack
 * @param req(Request) -- NodeJS-запрос
 * @param res(Request) -- NodeJS-ответ
 */
async function handleSlackPayload(req, res) {
	console.log("processing incoming payload");
	// TODO: изменить проверку того, что запрос пришел от Slack
	// https://api.slack.com/docs/verifying-requests-from-slack
	if (!req.body.payload) {
		return;
	}
	const payload = JSON.parse(req.body.payload);
	if (payload.token !== credentials.slack.verification) {
		console.log("invalid token: ", req.body.token);
		return;
	}
	res.status(200).end();
	// TODO: добавить проверку того, что это именно форма от команды /time
	if (payload.type === "view_submission") {
		await handleTimeModalSend(payload);
	}
	console.log("done processing incoming payload");
}

/**
 * Функция парсит дату формата DD/MM/YYYY
 * @param date(string) -- дата в формате DD/MM/YYYY
 * @returns date(Date) -- соответствующее значение Date
 */
function parseDateFromSpreadsheets(date) {
	const strs = date.split("/");
	return new Date(+strs[2], strs[1] - 1, +strs[0], 0, -timezoneOffset);
}

/**
 * Функция посылает в заданный канал Slack предупреждение об отсутствии записей о работе за предыдущий рабочий день
 * @param channel(string) -- ID канала Slack
 */
async function sendWarning(channel, user) {
	console.log("sending warning to", user.nickname, ", channel ", channel);
	const text =
		"Вы забыли отправить форму за предыдущий рабочий день. Пожалуйста, наберите команду /time и внесите часы по своим проектам.";
	await request.post("https://slack.com/api/chat.postMessage", {
		headers: {
			Authorization: "Bearer " + credentials.slack.token,
		},
		json: {
			channel,
			text,
		},
	});
	console.log("done sending warning to", user.nickname);
}

/**
 * Функция проверяет наличие записей за предыдущие рабочие дни у пользователя, и если их нет, а должны быть, посылает предупреждение
 * @param today(Date) -- сегодняшняя дата
 * @param user({ fullName: string, nickname: string, sheetId: string, everydayReport: boolean }) -- запись о пользователе из гугл-таблиц
 * @param slackId(string) -- ID канала Slack, в который слать предупреждение
 * @param offDays({[day: string]: boolean}) -- словарь с записями о выходных днях
 */
async function checkUser(today, user, slackId, offDays) {
	if (!user.everydayReport) {
		return;
	}
	console.log("check user ", user.nickname);
	const records = await sheets.spreadsheets.values.get({
		spreadsheetId: user.sheetId,
		range: "B2:B",
	});
	const latestRecord = Math.max.apply(
		Math,
		records.data.values.map(([d]) => parseDateFromSpreadsheets(d))
	);
	console.log("last record of ", user.nickname, " — ", latestRecord);
	const shiftingDay = new Date(latestRecord);
	console.log("shifting", user.nickname, " — ", shiftingDay);
	while (true) {
		shiftingDay.setUTCHours(24);
		if (today - shiftingDay < 86400000) {
			break;
		} // 24 * 60 * 60 * 1000 -- количество миллисекунд в одном дне
		if (!offDays[dateOnlyIsoString(shiftingDay)]) {
			sendWarning(slackId, user);
			break;
		}
	}
}

/**
 * Функция, вызываемая при старте скрипта и каждую полночь,
 * запрашивающая списки пользователей и проектов из гугл-таблиц
 * и сохраняющая их в глобальные переменные users и projects
 */
async function dailyCronTick() {
	console.log("daily cron ticking at ", new Date().toLocaleString());
	await updateUsersAndProjects();
	console.log("done daily cron tick");
}

/**
 * Функция, вызываемая каждый рабочий час для напоминалки пользователям (см. @function sendWarning и @function checkUser)
 */
async function hourlyCronTick() {
	console.log("hourly cron ticking at ", new Date().toLocaleString());
	const googleUsers = users;
	request.get("https://slack.com/api/users.list", {
		headers: {
			Authorization: "Bearer " + credentials.slack.token,
		},
	});
	const slackUsersText = await request.post(
		"https://slack.com/api/users.list",
		{
			headers: {
				Authorization: "Bearer " + credentials.slack.token,
			},
		}
	);
	const slackUsers = JSON.parse(slackUsersText).members;
	const now = new Date();
	const offDays = JSON.parse(fs.readFileSync(config.paths.day_off));
	console.log(offDays);
	// Если сегодня выходной -- пропускаем
	if (offDays[dateOnlyIsoString(now)]) {
		return;
	}
	const promises = slackUsers
		// Соответствие между пользователями Slack и их гугл-таблицами
		.map((slackUser) => [googleUsers[slackUser.name], slackUser.id])
		// Пропускаем тех пользователей, у которых нет таблиц
		.filter((u) => u[0] !== undefined)
		// Для всех остальных -- асинхронно проверяем рабочие дни и записи в таблице
		.map((u) => checkUser(now, u[0], u[1], offDays));
	// Ждем все промисы
	for (const p of promises) {
		await p;
	}
	console.log("done hourly cron ticking");
}

(async () => {
	await express.start();
	await mongo.start();
	await auth();
	await scheduler.schedule();
	await updateUsersAndProjects();
})();
