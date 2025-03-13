import { CreateProjectCommand } from "../../../../commands/index.js";
import { createProjectFlow } from "../../../../flows/index.js";
export default async function createProject(req, res, next) {
  try {
    const { teamId, name } = req.body;
    const { userId } = req.data;
    const command = CreateProjectCommand.fromHttp({ name, teamId, userId });
    const project = await createProjectFlow(command);
    return next({ code: 0, content: project });
  } catch (e) {
    return next({ code: 20204, trace: e });
  }
}
