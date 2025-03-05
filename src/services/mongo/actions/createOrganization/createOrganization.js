import DB from "../../requests.js";

export async function createOrganization(query) {
  DB.insertOne("organizations", {
    query,
  });
}
