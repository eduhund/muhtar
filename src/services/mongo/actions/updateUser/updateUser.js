import DB from "../../requests.js";

export async function updateUser(user) {
  const { id } = user;
  DB.setOne("users", {
    query: {
      id,
    },
    set: user,
    options: {
      insertNew: true,
    },
  });
}
