import DB from "../../requests.js";

export async function setNewTime(query) {
  DB.insertOne("time", {
    query,
  });
}
