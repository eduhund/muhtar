import { dateOnlyIsoString } from "../../utils/date.js";

export function getHoursList() {
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

export function getProjectList(projects = []) {
  const projectList = [];
  for (const project of projects) {
    const { subprojects, name, channelName } = project;
    const projectName = name || channelName;
    if (Array.isArray(subprojects) && subprojects.length > 0) {
      subprojects.forEach((subproject, i) => {
        projectList.push({
          text: {
            type: "plain_text",
            text: projectName + " | " + subproject,
            emoji: true,
          },
          value: project?.id + "_" + i,
        });
      });
    } else {
      projectList.push({
        text: {
          type: "plain_text",
          text: projectName,
          emoji: true,
        },
        value: project?.id,
      });
    }
  }
  return projectList;
}

export function timeModal({ triggerId, projects, selectedProject }) {
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

export function timeSuccess({ userId, projectId }) {
  return {
    channel: projectId,
    user: userId,
    text: "Спасибо! Я добавил часы к проекту.",
  };
}

export function addToExistProject({ channelId }) {
  return {
    channel: channelId,
    text: "Woff! Я уже знаю про этот проект 🙃",
  };
}

export function addNewProject({ channelId, name }) {
  return {
    channel: channelId,
    text: `Всем привет! Теперь мне можно рассказывать про часы на проекте ${name}\n\n А еще вот команды, которые я понимаю:\n/rename [new_name] — переименует проект в списке проектов\n/subprj -add [subprj_name] | -remove [subprj_name] | -list — поможет настроить подпроекты (для более точного учета часов)`,
  };
}

export function addSubProject({ channelId, userId, subproject }) {
  return {
    channel: channelId,
    user: userId,
    text: `Отлично! Теперь можно заносить часы в подпроект ${subproject}`,
  };
}

export function removeSubProject({ channelId, userId, subproject }) {
  return {
    channel: channelId,
    user: userId,
    text: `Я убрал подпроект ${subproject} из списка. Все уже внесенные часы сохранил.`,
  };
}

export function subProjectsList({ channelId, userId, subprojects = [] }) {
  const subprojectString = subprojects.join(", ");
  return {
    channel: channelId,
    user: userId,
    text: `Сейчас работа кипит по этим подпроектам: ${subprojectString}`,
  };
}

export function noSubProjects({ channelId, userId, name }) {
  return {
    channel: channelId,
    user: userId,
    text: `На проекте ${name} нет подпроектов. Все фигачат в одной лодке.`,
  };
}

export function renameEmpty({ channelId, userId }) {
  return {
    channel: channelId,
    user: userId,
    text: `Я не увидел новое название проекта. Может, плохо искал. Давайте попробуем вместе еще раз?`,
  };
}

export function renameSuccess({ channelId, userId, newName }) {
  return {
    channel: channelId,
    user: userId,
    text: `Отлично! Теперь в списке проектов будет написано: ${newName}`,
  };
}

export function getMyLastTime({ channelId, userId, data }) {
  const { projectName, date, workDate, duration, comment } = data;
  return {
    channel: channelId,
    user: userId,
    text: `Последние часы, которые я вижу на проекте ${projectName}, вы занесли ${date} за ${workDate}. Потратили ${duration} часа, а делали вот что:\n${comment}`,
  };
}

export function getUserLastTime({ channelId, userId, data }) {
  const { userName, projectName, date, workDate, duration, comment } = data;
  return {
    channel: channelId,
    user: userId,
    text: `Последние часы, которые я вижу на проекте ${projectName}, ${userName} занес ${date} за ${workDate}. Потратил ${duration} часа, а делал вот что:\n${comment}`,
  };
}

export function userNoTime({ channelId, userId }) {
  return {
    channel: channelId,
    user: userId,
    text: `Этот пользователь еще не заносил свои часы. Возможно, ему и не надо.`,
  };
}

export function dailyManagerReport({ channelId, data }) {
  let text = "";
  if (data.length === 0) {
    text = "Фрилансеры еще не заносили свои часы за предыдущий рабочий день.";
  } else {
    text = "Вчера фрилансеры наработали:\n";
    for (const item of data) {
      text += `\n• ${item.name}: ${item.time}`;
    }
  }
  return {
    channel: channelId,
    text,
  };
}

export function noTrackedTimeAlarm({ userId }) {
  return {
    channel: userId,
    text: `‼️АЛАРМ‼️\n\nЯ не вижу затреканных тобой часов за предыдущий рабочий день. Сделай это, пожалуйста!\nНе нервируй Наташу, менеджера и бедную собачку... 💔`,
  };
}

export function newLeadNeverhund({ channelId, name, email, more }) {
  console.log(name);
  return {
    channel: channelId,
    text: `☎️ У нас новый лид на сайте Neverhund: ${name} (${email})\n\n${more}`,
    username: "Робот-пылесос",
    icon_url: "https://files.eduhund.com/robot_vc.png",
  };
}
