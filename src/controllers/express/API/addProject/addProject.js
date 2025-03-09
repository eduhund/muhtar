export async function addProject(req, res, next) {
  try {
    const { organizationId, name } = req.body;
    return next({ code: 0 });
  } catch (e) {
    return next({ code: 20204, trace: e });
  }
}
