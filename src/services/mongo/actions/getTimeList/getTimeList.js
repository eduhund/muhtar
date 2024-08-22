import DB from "../../requests.js";

export async function getTimeList(query) {
  return DB.getMany(
    "time",
    { query },
    {
      limit: 1,
      sort: true,
    }
  );
}
