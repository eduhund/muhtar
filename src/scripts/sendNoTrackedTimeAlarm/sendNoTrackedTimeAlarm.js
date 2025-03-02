export async function sendNoTrackedTimeAlarm() {
  if (!(await isDayWorkday())) return;

  const users = await getUsers({
    sendDailyAlarm: true,
    isDeleted: false,
  });

  for (const user of users) {
    const timeBoard = await getTimeList(
      {
        userId: user.id,
        date: previusWorkday,
      },
      {
        limit: 0,
      }
    );

    if (timeBoard.length === 0) {
      await sendMessage("noTrackedTimeAlarm", {
        userId: user.id,
      });
      log.debug("Send no tracked time alarm to user ", user.name);
    }
  }
}
