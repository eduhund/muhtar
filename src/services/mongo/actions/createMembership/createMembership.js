import DB from "../../requests.js";

export async function createMembership(query) {
  DB.insertOne("memberships", {
    query,
  });
}
