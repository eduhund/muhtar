const { dateOnlyIsoString } = require("../../utils/date");

function getHoursList() {
	const list = [];
	for (let h = 0.5; h <= 10; h += 0.5) {
		list.push({
			text: {
				type: "plain_text",
				text: h.toString(),
			},
			value: (h * 60).toString(),
		});
	}
	return list;
}

function getProjectList(projects) {
	return projects.map((project) => {
		return {
			text: {
				type: "plain_text",
				text: project?.description || project?.name,
				emoji: true,
			},
			value: project?.id,
		};
	});
}

function timeModal({ triggerId, projects, selectedProject }) {
	const today = new Date();
	const todayDate = dateOnlyIsoString(today);
	const hoursList = getHoursList();
	const projectList = getProjectList(projects);
	const selProjectList = getProjectList(selectedProject);
	const modal = {
		type: "modal",
		callback_id: "timeModal",
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
					initial_date: todayDate,
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
					options: projectList,
					initial_option: selProjectList[0] || undefined,
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
					options: hoursList,
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
					placeholder: {
						type: "plain_text",
						text: "Напишите что-нибудь",
						emoji: true,
					},
				},
				label: {
					type: "plain_text",
					text: "Опишите, что вы делали",
					emoji: true,
				},
			},
		],
	};

	return {
		trigger_id: triggerId,
		view: modal,
	};
}

module.exports = {
	timeModal,
};
