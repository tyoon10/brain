import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(import.meta.dirname, '..', '_site');

if (!existsSync(dist)) {
  console.error('_site/ missing. Run npm run build first.');
  process.exit(1);
}

function htmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(path);
    if (entry.name.endsWith('.html')) return [path];
    return [];
  });
}

const hits = htmlFiles(dist).filter((file) => /<script/i.test(readFileSync(file, 'utf8')));

if (hits.length > 0) {
  console.error('Client JS found in the static build:');
  for (const file of hits) console.error(`  ${file}`);
  process.exit(1);
}

console.log('No <script> tags in built HTML.');
