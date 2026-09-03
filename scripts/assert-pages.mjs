import { readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(import.meta.dirname, '..', '_site');
const expected = 43;

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

const all = htmlFiles(dist);
const publicPages = all.filter((file) => !file.endsWith('/404.html') && !file.endsWith('\\404.html'));
const rel = (file) => file.slice(dist.length);

if (publicPages.length !== expected) {
  console.error(`Expected ${expected} public HTML pages (excluding 404). Found ${publicPages.length}.`);
  for (const file of publicPages.sort()) console.error(`  ${rel(file)}`);
  process.exit(1);
}

const required = [
  '/index.html',
  '/room/index.html',
  '/map/index.html',
  '/table/index.html',
  '/sitemap/index.html',
  '/docket/index.html',
  '/docket/upcoming/index.html',
  '/offer-book/index.html',
  '/brief/index.html',
  '/benefits/index.html',
  '/programs/index.html',
  '/labs/index.html',
  '/freshness/index.html',
  '/seats/index.html',
  '/door/index.html',
  '/brief/glm-held/index.html',
  '/offer-book/wispr-flow/index.html',
  '/seats/yale-som/index.html',
];

const missing = required.filter((path) => !existsSync(join(dist, path.replace(/^\//, ''))));
if (missing.length) {
  console.error('Missing required routes:');
  for (const path of missing) console.error(`  ${path}`);
  process.exit(1);
}

console.log(`Public HTML count: ${publicPages.length} (404 excluded).`);
