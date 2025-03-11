export function getProjection(returns = []) {
  const projection = {};
  for (const param of returns) {
    projection[param] = 1;
  }
  return projection;
}

export function buildQuery(params) {
  const query = {};
  for (const { key, value } in Object.entries(params)) {
    if (value === undefined) continue;
    query[key] = value;
  }
  return query;
}
