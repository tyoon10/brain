import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadCollection } from '../lib/load.mjs';
import { past, upcoming } from '../lib/upcoming.mjs';

const now = new Date('2026-09-03T12:00:00-04:00');

test('preview inventory matches the founder brief', () => {
  const events = loadCollection('events');
  const offers = loadCollection('offers');
  const benefits = loadCollection('benefits');
  const campus = loadCollection('campus-programs');
  const labs = loadCollection('labs');
  const mechanisms = loadCollection('mechanisms');
  const wire = loadCollection('wire');

  assert.equal(events.length, 11);
  assert.equal(offers.length, 8);
  assert.equal(benefits.length, 19);
  assert.equal(campus.length, 6);
  assert.equal(labs.length, 9);
  assert.equal(mechanisms.length, 11);
  assert.equal(wire.length, 20);
  assert.equal(wire.filter((item) => item.lane === 'industry').length, 7);
  assert.equal(wire.filter((item) => item.lane === 'campus').length, 13);
  assert.equal(wire.filter((item) => item.held).length, 1);
  assert.equal(benefits.filter((item) => item.tier === 'same-day').length, 5);
  assert.equal(benefits.filter((item) => item.tier === 'this-week').length, 5);
  assert.equal(benefits.filter((item) => item.tier === 'this-month').length, 5);
  assert.equal(benefits.filter((item) => item.tier === 'this-term').length, 4);
});

test('past board is fully populated and upcoming stays empty', () => {
  const events = loadCollection('events');
  assert.equal(past(events, now).length, 11);
  assert.equal(upcoming(events, now).length, 0);
  const dates = past(events, now).map((item) => item.startsAt.toISOString().slice(0, 10));
  assert.equal(dates[0], '2026-08-05');
  assert.equal(dates.at(-1), '2025-09-30');
});

test('Wispr door is the student page, not a referral URL', () => {
  const wispr = loadCollection('offers').find((item) => item.slug === 'wispr-flow');
  assert.equal(wispr.href, 'https://wisprflow.ai/students');
});

test('every sitting marks eligibility inferred and links out', () => {
  for (const sitting of loadCollection('events')) {
    assert.equal(sitting.eligibilityInferred, true);
    assert.match(sitting.href, /^https:\/\//);
    assert.match(sitting.relation, /^(owned|co-hosted|listed)$/);
  }
});
