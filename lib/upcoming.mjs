/**
 * Upcoming sittings on the docket.
 * Always resolves to an array — never throws.
 */
export function upcoming(items, now = new Date()) {
  if (!Array.isArray(items)) return [];
  const horizon = now.getTime();
  if (Number.isNaN(horizon)) return [];

  const resolved = [];
  for (const item of items) {
    if (!item || item.startsAt == null) continue;
    const start = item.startsAt instanceof Date ? item.startsAt : new Date(item.startsAt);
    if (Number.isNaN(start.getTime())) continue;
    if (start.getTime() >= horizon) resolved.push(item);
  }

  return resolved.sort((a, b) => new Date(a.startsAt) - new Date(b.startsAt));
}

export function past(items, now = new Date()) {
  if (!Array.isArray(items)) return [];
  const horizon = now.getTime();
  if (Number.isNaN(horizon)) return [];

  const resolved = [];
  for (const item of items) {
    if (!item || item.startsAt == null) continue;
    const start = item.startsAt instanceof Date ? item.startsAt : new Date(item.startsAt);
    if (Number.isNaN(start.getTime())) continue;
    if (start.getTime() < horizon) resolved.push(item);
  }

  return resolved.sort((a, b) => new Date(b.startsAt) - new Date(a.startsAt));
}
