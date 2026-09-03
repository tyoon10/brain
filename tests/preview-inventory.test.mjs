import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { loadCollection } from '../lib/load.mjs';
import { past, upcoming } from '../lib/upcoming.mjs';
import { wireSchema } from '../lib/schemas.mjs';

const now = new Date('2026-09-03T12:00:00-04:00');
const root = join(import.meta.dirname, '..');

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
  assert.equal(wire.length, 39);
  assert.equal(wire.filter((item) => item.lane === 'industry').length, 25);
  assert.equal(wire.filter((item) => item.lane === 'campus').length, 14);
  assert.equal(wire.filter((item) => item.held).length, 2);
  assert.equal(benefits.filter((item) => item.tier === 'same-day').length, 5);
  assert.equal(benefits.filter((item) => item.tier === 'this-week').length, 5);
  assert.equal(benefits.filter((item) => item.tier === 'this-month').length, 5);
  assert.equal(benefits.filter((item) => item.tier === 'this-term').length, 4);
});

test('industry wire is categorized, in-window, and archived stubs stay unloaded', () => {
  const wire = loadCollection('wire');
  const industry = wire.filter((item) => item.lane === 'industry');
  const campus = wire.filter((item) => item.lane === 'campus');
  const byCategory = Object.fromEntries(
    ['release', 'acquisition', 'investment', 'partnership'].map((category) => [
      category,
      industry.filter((item) => item.category === category).length,
    ]),
  );

  assert.deepEqual(byCategory, {
    release: 18,
    acquisition: 4,
    investment: 2,
    partnership: 1,
  });

  for (const item of industry) {
    assert.ok(item.category, `${item.slug} missing category`);
    const day = item.publishedAt.toISOString().slice(0, 10);
    assert.ok(day >= '2026-03-03', `${item.slug} before window (${day})`);
    assert.ok(day <= '2026-09-03', `${item.slug} after window (${day})`);
  }

  assert.equal(
    campus.filter((item) => item.slug.startsWith('sat-')).length,
    11,
  );
  assert.equal(
    campus.find((item) => item.slug === 'cursor-student-closed')?.lane,
    'campus',
  );
  assert.equal(
    campus.find((item) => item.slug === 'osc-closed')?.lane,
    'campus',
  );
  assert.equal(
    campus.find((item) => item.slug === 'claude-campus-closed')?.lane,
    'campus',
  );

  const slugs = new Set(wire.map((item) => item.slug));
  assert.equal(slugs.has('spacex-xai'), false);
  assert.equal(slugs.has('gpt-5-6-sol'), false);
  assert.equal(slugs.has('amazon-openai-partnership'), false);
  assert.ok(existsSync(join(root, 'data', 'wire-archive', 'spacex-xai.yml')));

  const held = wire.filter((item) => item.held).map((item) => item.slug).sort();
  assert.deepEqual(held, ['anthropic-decart', 'glm-held']);

  const glm = wire.find((item) => item.slug === 'glm-held');
  assert.equal(glm.held, true);
  assert.equal(glm.category, 'release');
  assert.equal(glm.href, undefined);
  assert.match(glm.summary, /held/i);
  assert.doesNotMatch(glm.title, /\d/);
});

test('industry items without category fail validation', () => {
  const result = wireSchema.safeParse({
    slug: 'missing-category',
    title: 'Missing category',
    publishedAt: '2026-06-01',
    summary: 'Should not load.',
    lane: 'industry',
    held: false,
    inferred: false,
  });
  assert.equal(result.success, false);
});

test('campus items may omit category', () => {
  const result = wireSchema.safeParse({
    slug: 'campus-ok',
    title: 'Campus notice',
    publishedAt: '2026-06-01',
    summary: 'Campus lane may omit category.',
    lane: 'campus',
    held: false,
    inferred: false,
  });
  assert.equal(result.success, true);
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

test('campus seat cards have three distinct lines', () => {
  for (const seat of loadCollection('programs')) {
    const lines = [seat.school, seat.shortName, seat.sittingFrom];
    assert.equal(new Set(lines).size, 3, `${seat.id} repeats a card line`);
    assert.notEqual(seat.school, seat.name);
  }
});

test('every sitting marks eligibility inferred and links out', () => {
  for (const sitting of loadCollection('events')) {
    assert.equal(sitting.eligibilityInferred, true);
    assert.match(sitting.href, /^https:\/\//);
    assert.match(sitting.relation, /^(owned|co-hosted|listed)$/);
  }
});
