import log from "../log4js/logger.js";
import { IsDayOffAPI } from "isdayoff";
const isDayOff = new IsDayOffAPI();

let currentMonthWorkdays = [];
let previousMonthWorkdays = [];

async function getCurrentMonthWorkdays(month) {
  try {
    currentMonthWorkdays = await isDayOff.month({ month });
  } catch (e) {
    currentMonthWorkdays = [];
    console.log(e);
    throw new Error("Error with getting current month workdays");
  }
}

async function getPreviousMonthWorkdays(month, year) {
  try {
    previousMonthWorkdays = await isDayOff.month({ month, year });
  } catch (e) {
    previousMonthWorkdays = [];
    log.debug(e);
    throw new Error("Error with getting previous month workdays");
  }
}

function findWorkday(todayDate) {
  for (let i = todayDate; i >= 0; i--) {
    if (!currentMonthWorkdays[i]) return { date: i + 1, currentMonth: true };
  }
  for (let i = previousMonthWorkdays.length - 1; i >= 0; i--) {
    if (!previousMonthWorkdays[i]) return { date: i + 1, currentMonth: false };
  }
  throw new Error("Can't find previous workday");
}

export async function setWorkdays() {
  try {
    const date = new Date();
    const month = date.getMonth();
    const year = month > 0 ? date.getFullYear() : date.getFullYear() - 1;
    await getCurrentMonthWorkdays(month);
    await getPreviousMonthWorkdays(month ? month - 1 : 12, year);
    log.info("Workdays have been set");
    log.debug("Current month workdays: ", currentMonthWorkdays);
    log.debug("Previous month workdays: ", previousMonthWorkdays);
  } catch (e) {
    log.error("Error with setting workdays: ", e);
  }
}

export function getPreviousWorkday() {
  try {
    const today = new Date();
    const todayDate = new Date().getDate();
    const { date, currentMonth } = findWorkday(todayDate);
    const month = currentMonth ? today.getMonth() : today.getMonth() - 1;
    const year = month > 0 ? today.getFullYear() : today.getFullYear() - 1;
    return new Date(Date.UTC(year, month, date));
  } catch (e) {
    log.error("Error with getting previous workday: ", e);
    const date = new Date(getPreviousWorkday());
    date.setUTCDate(date.getUTCDate() - 1);
    return new Date(
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
    );
  }
}

export async function isDayWorkday(day = Date.now()) {
  try {
    const dayDate = new Date(day);
    const date = dayDate.getDate();
    const month = dayDate.getMonth();
    const year = dayDate.getFullYear();
    return await isDayOff.date({ date, month, year });
  } catch (e) {
    log.error("Error with getting day status: ", e);
  } finally {
    return true;
  }
}
