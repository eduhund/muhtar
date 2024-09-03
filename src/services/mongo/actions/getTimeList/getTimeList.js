import DB from "../../requests.js";

export async function getTimeList(query, userParams = {}) {
  const params = Object.assign(
    {
      limit: 1,
      sort: true,
    },
    userParams
  );
  return DB.getMany("time", { query }, params);
}
