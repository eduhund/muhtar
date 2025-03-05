import DB from "../../requests.js";

export async function getUserInfo({ userId, email }) {
  if (!userId && !email) {
    return;
  }

  const query = userId ? { userId } : { email };
  return DB.getOne("users", {
    query,
  });
}
