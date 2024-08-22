import log from "../log4js/logger.js";
import fetch from "node-fetch";

function dateOnlyIsoString(date) {
  return date.toISOString().split("T")[0];
}

async function getWorkdays() {
  log.info("Updating workdays calendar...");
  // Т.к. setUTCDate обрабатывает переполнение в любую сторону, то lastDateCurrentMonth -- последнее число текущего месяца
  const lastDateCurrentMonth = new Date();
  lastDateCurrentMonth.setUTCDate(32);
  lastDateCurrentMonth.setUTCDate(0);
  // А firstDatePrevMonth -- первое число предыдущего месяца
  const firstDatePrevMonth = new Date(+lastDateCurrentMonth);
  firstDatePrevMonth.setUTCDate(0);
  firstDatePrevMonth.setUTCDate(1);

  const shiftingDay = new Date(+firstDatePrevMonth);
  const promises = [];
  // Проходим по всем дням с первого числа предыдущего месяца по последнее число текущего месяца
  // Стандартный цикл for здесь только ухудшит читаемость, поэтому -- while
  // eslint-disable-next-line no-unmodified-loop-condition
  while (lastDateCurrentMonth - shiftingDay > 0) {
    const string = dateOnlyIsoString(shiftingDay);
    // Для каждого дня запрашиваем, выходной ли это день
    promises.push([
      string,
      fetch("https://isdayoff.ru/" + string).then((response) =>
        response.text()
      ),
    ]);
    // Переходим к следующему дню
    shiftingDay.setUTCHours(24);
  }

  // Ждем ответов для всех дней и собираем результаты в словарь
  const records = {};
  for (const [s, p] of promises) {
    records[s] = (await p) === "1";
  }
  return records;
}

let days = {};

export async function setDays() {
  days = await getWorkdays();
  console.log(days);
}
