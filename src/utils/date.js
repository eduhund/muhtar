export function dateOnlyIsoString(date) {
  return date.toISOString().split("T")[0];
}
