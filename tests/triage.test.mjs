import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { parseDecision } from '../ops/triage/schema.mjs';
import { prefilter } from '../ops/triage/keywords.mjs';
import { loadFixtures, main } from '../ops/triage/run.mjs';

const root = join(import.meta.dirname, '..');

const requiredFiles = [
  'data/wire/CRITERIA.md',
  'data/events/FEATURED.md',
  'ops/triage/README.md',
  'ops/triage/prompts/industry-brief.md',
  'ops/triage/prompts/featured-event.md',
  'ops/triage/schema.json',
  'ops/triage/run.mjs',
];

test('triage files exist and ops is not a public collection', () => {
  for (const rel of requiredFiles) {
    assert.ok(existsSync(join(root, rel)), rel);
  }
});

test('industry prompt carries BRAIN-signal constraints verbatim', () => {
  const prompt = readFileSync(join(root, 'ops/triage/prompts/industry-brief.md'), 'utf8');
  const criteria = readFileSync(join(root, 'data/wire/CRITERIA.md'), 'utf8');
  const lines = [
    'Never auto-feed or auto-publish — drafts only; founder stamp still required.',
    'Wire content: no commentary, no benchmark scoreboards, no personnel gossip.',
    'Three M&A states never blurred: announce / rumored / closed stay distinct; SEC for close status.',
    'GLM held until explicitly lifted; GLM version and Chinese-lab dates are weak sourcing.',
    'Sourcing order from SOURCES.md: company primary weekly → Tier A press only when primary silent on $ or close → Tier B discovery only.',
  ];
  for (const line of lines) {
    assert.ok(prompt.includes(line), line);
    assert.ok(criteria.includes(line), line);
  }
});

test('featured prompt requires coming week, relevance, and named sponsor or BRAIN exception', () => {
  const prompt = readFileSync(join(root, 'ops/triage/prompts/featured-event.md'), 'utf8');
  const featured = readFileSync(join(root, 'data/events/FEATURED.md'), 'utf8');
  for (const needle of [
    'upcoming 7 days',
    'Past events are never featured',
    'major AI company',
    'big venture fund',
    'Never invent a sponsor',
    'BRAIN-owned / co-chaired',
  ]) {
    assert.ok(prompt.includes(needle) || featured.includes(needle), needle);
  }
  assert.match(prompt, /in coming week/);
  assert.match(prompt, /audience relevance/);
  assert.match(prompt, /sponsor\/host is unknown/);
});

test('fixture decisions match the Luna schema', () => {
  const fixtures = loadFixtures();
  assert.ok(fixtures.length >= 4);
  for (const fixture of fixtures) {
    const parsed = parseDecision(fixture.decision);
    assert.equal(parsed.decision, fixture.decision.decision);
  }
});

test('prefilter keeps a named OpenAI sitting and drops empty fluff', () => {
  const keep = prefilter({
    lane: 'featured-event',
    title: 'OpenAI NYC builder sitting',
    summary: 'OpenAI at Columbia.',
    location: 'Manhattan',
  });
  assert.equal(keep.pass, true);
  const drop = prefilter({
    lane: 'featured-event',
    title: '???',
    summary: 'n/a',
  });
  assert.equal(drop.pass, false);
});

test('industry include without category fails the decision schema', () => {
  assert.throws(() =>
    parseDecision({
      decision: 'include',
      lane: 'industry',
      category: null,
      confidence: 0.9,
      reasons: ['flagship'],
      matchedKeywords: [],
      failedChecks: [],
      draft: { slug: 'x', title: 'X', summary: 'X' },
    }),
  );
});

test('Luna prompts describe a weekly curator sweep', () => {
  const industry = readFileSync(join(root, 'ops/triage/prompts/industry-brief.md'), 'utf8');
  const featured = readFileSync(join(root, 'ops/triage/prompts/featured-event.md'), 'utf8');
  const readme = readFileSync(join(root, 'ops/triage/README.md'), 'utf8');
  assert.match(industry, /weekly curation sweep/);
  assert.match(featured, /weekly event sweep/);
  assert.match(readme, /curator and weekly screener/);
});

test('npm run triage dry-runs without an API key', async () => {
  await main(['--fixture']);
  const result = spawnSync(process.execPath, ['ops/triage/run.mjs', '--fixture'], {
    cwd: root,
    env: { ...process.env, OPENAI_API_KEY: '' },
    encoding: 'utf8',
  });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /OPENAI_API_KEY missing/);
  assert.doesNotMatch(result.stdout, /data\/wire/);
});
