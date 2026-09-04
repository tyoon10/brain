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

/** Sittings whose start falls in [from, from + days). Always an array. */
export function comingWeek(items, from = new Date(), days = 7) {
  if (!Array.isArray(items)) return [];
  const start = from instanceof Date ? from : new Date(from);
  if (Number.isNaN(start.getTime())) return [];
  const endMs = start.getTime() + days * 24 * 60 * 60 * 1000;
  return upcoming(items, start).filter((item) => {
    const at = item.startsAt instanceof Date ? item.startsAt : new Date(item.startsAt);
    return at.getTime() < endMs;
  });
}

/** Featured newsletter slot: featured:true and inside the coming week. */
export function featuredComingWeek(items, from = new Date(), days = 7) {
  return comingWeek(items, from, days).filter((item) => item.featured);
}
