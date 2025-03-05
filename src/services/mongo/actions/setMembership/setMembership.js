import DB from "../../requests.js";

export async function setMembership(query, update) {
  const { set } = update;
  DB.setOne("memberships", {
    query,
    set,
  });
}
