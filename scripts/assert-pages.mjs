import { readdirSync, existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(import.meta.dirname, '..', '_site');
const expected = 44;

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
  '/newsletter/index.html',
  '/benefits/index.html',
  '/programs/index.html',
  '/labs/index.html',
  '/freshness/index.html',
  '/seats/index.html',
  '/door/index.html',
  '/brief/glm-held/index.html',
  '/brief/gpt-5-6/index.html',
  '/brief/nvidia-hugging-face/index.html',
  '/offer-book/wispr-flow/index.html',
  '/seats/yale-som/index.html',
];

const missing = required.filter((path) => !existsSync(join(dist, path.replace(/^\//, ''))));
if (missing.length) {
  console.error('Missing required routes:');
  for (const path of missing) console.error(`  ${path}`);
  process.exit(1);
}

const home = readFileSync(join(dist, 'index.html'), 'utf8');
if (home.includes('mark-slot')) {
  console.error('Homepage still has an empty mark slot.');
  process.exit(1);
}
if (publicPages.some((file) => /contact@brainyc\.org/i.test(readFileSync(file, 'utf8')))) {
  console.error('Unverified mailbox printed on a public page.');
  process.exit(1);
}

const claimed = [
  '/',
  '/room/',
  '/map/',
  '/table/',
  '/sitemap/',
  '/docket/',
  '/offer-book/',
  '/brief/',
  '/newsletter/',
  '/benefits/',
  '/programs/',
  '/labs/',
  '/freshness/',
  '/seats/',
  '/door/',
];
const homeNav = home;
for (const href of ['/room/', '/map/', '/table/', '/docket/', '/offer-book/', '/brief/', '/newsletter/', '/benefits/', '/sitemap/']) {
  if (!homeNav.includes(`href="${href}"`)) {
    console.error(`Primary nav missing ${href}`);
    process.exit(1);
  }
}
for (const href of claimed) {
  if (href === '/') continue;
  const file = join(dist, href.replace(/^\//, ''), 'index.html');
  if (!existsSync(file)) {
    console.error(`Claimed route missing: ${href}`);
    process.exit(1);
  }
}

console.log(`Public HTML count: ${publicPages.length} (404 excluded).`);
