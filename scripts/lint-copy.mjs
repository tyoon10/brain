import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..');
const built = process.argv.includes('--built');

const lexicon = [
  { id: 'word-a', pattern: /\bconvene?ors?\b/i },
  { id: 'word-b', pattern: /\bchapters?\b/i },
  { id: 'word-c', pattern: /\btrackers?\b/i },
  { id: 'word-d', pattern: /\bsociet(?:y|ies)\b/i },
  { id: 'word-e', pattern: /\bforums?\b/i },
  { id: 'ticket', pattern: /\btickets?\b/i },
  { id: 'checkout', pattern: /\bcheckout\b/i },
  { id: 'payment', pattern: /\bpayments?\b/i },
  { id: 'referral', pattern: /\breferrals?\b/i },
  { id: 'sponsor', pattern: /\bsponsors?(?:ing|hip|ed)?\b/i },
  { id: 'funding', pattern: /\bfunding\b/i },
];

const kit = [
  { id: 'parchment-paper', pattern: /#fefefc/i },
  { id: 'parchment-navy', pattern: /#17324d/i },
  { id: 'newsreader', pattern: /newsreader/i },
  { id: 'inter-face', pattern: /['"]Inter['"]|\bInter,/ },
  { id: 'jetbrains', pattern: /jetbrains/i },
];

const scanRoots = built
  ? [join(root, '_site')]
  : [join(root, 'site'), join(root, 'data'), join(root, 'lib'), join(root, 'eleventy.config.js')];

function walk(path) {
  if (!existsSync(path)) return [];
  const stat = statSync(path);
  if (stat.isFile()) return [path];
  return readdirSync(path, { withFileTypes: true }).flatMap((entry) => {
    if (
      entry.name === 'README.md' ||
      entry.name === 'SOURCES.md' ||
      entry.name === 'CRITERIA.md' ||
      entry.name === 'FEATURED.md' ||
      entry.name === '.gitkeep'
    )
      return [];
    const next = join(path, entry.name);
    if (entry.isDirectory()) return walk(next);
    if (!/\.(njk|html|css|js|mjs|yml|yaml|md|svg)$/.test(entry.name)) return [];
    return [next];
  });
}

let hits = 0;
const rules = built ? [...lexicon, ...kit] : [...lexicon, ...kit];

for (const start of scanRoots) {
  for (const file of walk(start)) {
    if (built && !/\.(html|css)$/.test(file)) continue;
    const lines = readFileSync(file, 'utf8').split('\n');
    lines.forEach((line, index) => {
      for (const rule of rules) {
        if (rule.pattern.test(line)) {
          hits += 1;
          const rel = file.slice(root.length + 1);
          console.error(`${rel}:${index + 1}  blocked token (${rule.id})`);
          console.error(`  ${line.trim()}`);
        }
      }
    });
  }
}

if (hits > 0) {
  console.error(`\n${hits} blocked-token hit(s).`);
  process.exit(1);
}

console.log(built ? 'Built HTML/CSS passed token lint.' : 'Source passed token lint.');
