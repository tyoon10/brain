import { test } from 'node:test';
import assert from 'node:assert/strict';
import { upcoming, past, comingWeek, featuredComingWeek } from '../lib/upcoming.mjs';

const now = new Date('2026-09-03T12:00:00-04:00');

test('upcoming always resolves for empty and invalid input', () => {
  assert.deepEqual(upcoming(undefined, now), []);
  assert.deepEqual(upcoming(null, now), []);
  assert.deepEqual(upcoming([], now), []);
  assert.deepEqual(upcoming([{ startsAt: 'not-a-date' }], now), []);
});

test('upcoming keeps future sittings in chronological order', () => {
  const items = [
    { id: 'later', startsAt: '2026-11-01T18:00:00-04:00' },
    { id: 'sooner', startsAt: '2026-10-01T18:00:00-04:00' },
    { id: 'past', startsAt: '2026-04-24T17:00:00-04:00' },
  ];
  assert.deepEqual(
    upcoming(items, now).map((item) => item.id),
    ['sooner', 'later'],
  );
});

test('a sitting that starts now is upcoming', () => {
  assert.equal(upcoming([{ startsAt: now.toISOString() }], now).length, 1);
});

test('past lists prior sittings newest first', () => {
  const items = [
    { id: 'march', startsAt: '2026-03-15T09:00:00-05:00' },
    { id: 'april', startsAt: '2026-04-24T17:00:00-05:00' },
  ];
  assert.deepEqual(
    past(items, now).map((item) => item.id),
    ['april', 'march'],
  );
});

test('coming week is seven days, not the full upcoming board', () => {
  const items = [
    { id: 'tomorrow', startsAt: '2026-09-04T18:00:00-04:00', featured: true },
    { id: 'next-month', startsAt: '2026-10-01T18:00:00-04:00', featured: true },
    { id: 'yesterday', startsAt: '2026-09-02T18:00:00-04:00', featured: true },
    { id: 'unflagged', startsAt: '2026-09-05T18:00:00-04:00', featured: false },
  ];
  assert.deepEqual(
    comingWeek(items, now).map((item) => item.id),
    ['tomorrow', 'unflagged'],
  );
  assert.deepEqual(
    featuredComingWeek(items, now).map((item) => item.id),
    ['tomorrow'],
  );
});
