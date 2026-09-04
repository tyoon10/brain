import { mkdirSync, readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { stringify } from 'yaml';
import { parseDecision } from './schema.mjs';
import { prefilter } from './keywords.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..', '..');
const MODEL = process.env.OPENAI_MODEL || 'gpt-5.6-luna';
const DATA_DIRS = [join(root, 'data', 'wire'), join(root, 'data', 'events')];

function read(rel) {
  return readFileSync(join(root, rel), 'utf8');
}

function slugify(value) {
  return String(value || 'item')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60) || 'item';
}

function loadPrompt(name) {
  return readFileSync(join(here, 'prompts', name), 'utf8');
}

function fillUserPrompt(lane, candidate) {
  if (lane === 'featured-event') {
    return [
      loadPrompt('featured-event.md'),
      '',
      '## FEATURED.md',
      read('data/events/FEATURED.md'),
      '',
      '## Candidate',
      JSON.stringify(candidate, null, 2),
    ].join('\n');
  }
  return [
    loadPrompt('industry-brief.md'),
    '',
    '## CRITERIA.md',
    read('data/wire/CRITERIA.md'),
    '',
    '## SOURCES.md',
    read('data/wire/SOURCES.md'),
    '',
    '## Candidate',
    JSON.stringify(candidate, null, 2),
  ].join('\n');
}

function assertNotDataPath(file) {
  const resolved = file;
  for (const dir of DATA_DIRS) {
    if (resolved.startsWith(dir)) {
      throw new Error(`refusing to write into ${dir}`);
    }
  }
}

function writeProposal(decision) {
  const outDir = join(here, 'out', 'proposals');
  mkdirSync(outDir, { recursive: true });
  const slug = slugify(decision.draft.slug || decision.draft.title);
  const jsonPath = join(outDir, `${slug}.decision.json`);
  const ymlPath = join(outDir, `${slug}.yml`);
  assertNotDataPath(jsonPath);
  assertNotDataPath(ymlPath);
  writeFileSync(jsonPath, `${JSON.stringify(decision, null, 2)}\n`);
  writeFileSync(ymlPath, stringify(decision.draft));
  return { jsonPath, ymlPath };
}

function loadCandidatesFromInbox(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((name) => /\.(json|jsonl)$/.test(name) && name !== '.gitkeep')
    .flatMap((name) => {
      const raw = readFileSync(join(dir, name), 'utf8').trim();
      if (!raw) return [];
      if (name.endsWith('.jsonl')) {
        return raw
          .split('\n')
          .filter(Boolean)
          .map((line) => JSON.parse(line));
      }
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [parsed];
    });
}

function loadFixtures() {
  const dir = join(here, 'fixtures');
  const files = readdirSync(dir).filter((name) => name.endsWith('.decision.json'));
  return files.map((name) => {
    const decision = JSON.parse(readFileSync(join(dir, name), 'utf8'));
    const candidateName = name.replace('.decision.json', '.candidate.json');
    const candidate = JSON.parse(readFileSync(join(dir, candidateName), 'utf8'));
    return { name, decision, candidate };
  });
}

async function callLuna(system, user) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${key}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
    }),
  });
  if (!response.ok) {
    throw new Error(`OpenAI ${response.status}: ${await response.text()}`);
  }
  const body = await response.json();
  const text = body.choices?.[0]?.message?.content;
  if (!text) throw new Error('empty Luna response');
  return JSON.parse(text);
}

async function triageCandidate(candidate) {
  const filter = prefilter(candidate);
  if (!filter.pass) {
    return {
      skipped: true,
      reason: 'prefilter',
      matchedKeywords: filter.matchedKeywords,
    };
  }
  const lane = candidate.lane === 'featured-event' ? 'featured-event' : 'industry';
  const promptFile = lane === 'featured-event' ? 'featured-event.md' : 'industry-brief.md';
  const system = loadPrompt(promptFile).split('## User payload')[0].trim();
  const user = fillUserPrompt(lane, candidate);
  const raw = await callLuna(system, user);
  if (!raw) {
    return { skipped: true, reason: 'missing-openai-key', matchedKeywords: filter.matchedKeywords };
  }
  const decision = parseDecision(raw);
  const files = writeProposal(decision);
  return { skipped: false, decision, files, matchedKeywords: filter.matchedKeywords };
}

function printDryRun(fixtures) {
  const key = process.env.OPENAI_API_KEY;
  for (const fixture of fixtures) {
    parseDecision(fixture.decision);
    const filter = prefilter(fixture.candidate);
    console.log(`ok  fixture ${fixture.name} decision=${fixture.decision.decision} prefilter=${filter.pass ? 'pass' : 'fail'}`);
  }
  if (!key) {
    console.log('dry-run: OPENAI_API_KEY missing; schema ok. No network call. No write to data/.');
  } else {
    console.log(`dry-run: key present; fixture schema ok. Model would be ${MODEL}. No inbox processed.`);
  }
}

async function main(argv = process.argv.slice(2)) {
  const fixtureMode = argv.includes('--fixture') || argv.length === 0;
  if (fixtureMode) {
    printDryRun(loadFixtures());
    return 0;
  }
  const inboxFlag = argv.indexOf('--inbox');
  const inboxDir = inboxFlag >= 0 ? argv[inboxFlag + 1] : join(here, 'inbox');
  const candidates = loadCandidatesFromInbox(inboxDir);
  if (!candidates.length) {
    console.log(`no candidates in ${inboxDir}`);
    return 0;
  }
  let wrote = 0;
  for (const candidate of candidates) {
    const result = await triageCandidate(candidate);
    if (result.skipped) {
      console.log(`skip ${candidate.title || candidate.slug || 'item'} (${result.reason})`);
      continue;
    }
    wrote += 1;
    console.log(`proposal ${result.files.ymlPath}`);
  }
  if (!process.env.OPENAI_API_KEY) {
    console.log('OPENAI_API_KEY missing; inbox prefiltered only. No Luna call. No write to data/.');
  }
  console.log(`proposals written: ${wrote}`);
  return 0;
}

const isCli = Boolean(process.argv[1]) && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isCli) {
  main().then((code) => process.exit(code));
}

export { fillUserPrompt, loadFixtures, main, parseDecision, prefilter, triageCandidate };
