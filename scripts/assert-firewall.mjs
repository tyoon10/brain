import { existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..');

const blockedPaths = [
  'hugo.yaml',
  'go.mod',
  'go.sum',
  'layouts',
  'content',
  'assets',
  'static',
  'static/media/logos',
  'site/favicon.svg',
  'site/favicon.ico',
  'favicon.ico',
  'favicon.svg',
];

const blockedName = /^(anthropic|lovable|manus|cbs|nyu|yale|yale-som|cornell-tech|elise|hebbia|bizcrush|stern)/i;
const imageExt = /\.(png|svg|jpg|jpeg|gif|webp|avif|ico)$/i;

function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '_site' || entry.name === '.git') return [];
      return walk(path);
    }
    return [path];
  });
}

let hits = 0;

for (const rel of blockedPaths) {
  if (existsSync(join(root, rel))) {
    hits += 1;
    console.error(`blocked path present: ${rel}`);
  }
}

for (const file of walk(root)) {
  const rel = file.slice(root.length + 1);
  const base = rel.split('/').pop() ?? '';
  if (imageExt.test(base) && blockedName.test(base)) {
    hits += 1;
    console.error(`blocked mark file: ${rel}`);
  }
  if (/(^|\/)logos\//.test(rel) && imageExt.test(base)) {
    hits += 1;
    console.error(`blocked mark file: ${rel}`);
  }
}

if (hits > 0) {
  console.error(`\n${hits} firewall hit(s). Marks are names in type, or an empty reserved slot.`);
  process.exit(1);
}

console.log('Firewall clear: no partner/school mark files, no stale Hugo tree.');
