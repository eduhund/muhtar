import { CreateProjectCommand } from "../../../../commands/index.js";
import { createProjectFlow } from "../../../../flows/index.js";
export default async function createProject(req, res, next) {
  try {
    const { teamId, title } = req.body;
    const { userId } = req.data;
    const command = CreateProjectCommand.fromHttp({ title, teamId, userId });
    await createProjectFlow.execute(command);
    return next({ code: 0 });
  } catch (e) {
    return next({ code: 20204, trace: e });
  }
}
