import { getUsers } from "../../services/mongo/actions.js";

export async function sendHoursToManager() {
  const freelansers = await getUsers({
    contractType: "freelance",
    status: "active",
  });
  console.log(freelansers);
  return;
}
