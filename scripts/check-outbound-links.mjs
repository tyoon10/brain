import { readFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const PUBLIC_PAGES = [
  { path: '/', file: 'index.html' },
  { path: '/offer-book/', file: 'offer-book/index.html' },
  { path: '/docket/', file: 'docket/index.html' },
  { path: '/brief/', file: 'brief/index.html' },
];

const TIMEOUT_MS = 15_000;

/**
 * Collect http(s) hrefs already present in HTML.
 * Anchors and stylesheets only. Skips mailto:, hashes, relative paths,
 * and preconnect origins. Does not invent URLs.
 */
export function extractHttpUrls(html) {
  const found = new Set();

  const take = (raw) => {
    if (!raw) return;
    const value = raw.trim();
    if (!value) return;
    if (value.startsWith('#') || /^mailto:/i.test(value)) return;
    if (!/^https?:\/\//i.test(value)) return;
    const stripped = value.replace(/#.*$/, '');
    if (!stripped || stripped === 'http:' || stripped === 'https:') return;
    found.add(stripped);
  };

  const aRe = /<a\b[^>]*?\bhref\s*=\s*(?:"([^"]*)"|'([^']*)')/gi;
  let match;
  while ((match = aRe.exec(html))) take(match[1] ?? match[2]);

  const linkRe = /<link\b[^>]*>/gi;
  while ((match = linkRe.exec(html))) {
    const tag = match[0];
    if (!/\brel\s*=\s*(["']?)stylesheet\1/i.test(tag)) continue;
    const href = tag.match(/\bhref\s*=\s*(?:"([^"]*)"|'([^']*)')/i);
    if (href) take(href[1] ?? href[2]);
  }

  return [...found].sort();
}

export function collectFromSite(siteDir) {
  const byPage = [];
  const all = new Set();
  for (const page of PUBLIC_PAGES) {
    const file = join(siteDir, page.file);
    if (!existsSync(file)) {
      throw new Error(`Missing built page ${page.path} (${page.file}). Run npm run build.`);
    }
    const urls = extractHttpUrls(readFileSync(file, 'utf8'));
    byPage.push({ path: page.path, urls });
    for (const url of urls) all.add(url);
  }
  return { byPage, urls: [...all].sort() };
}

async function request(url, method) {
  const response = await fetch(url, {
    method,
    redirect: 'follow',
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: { 'user-agent': 'brain-roundtable-preview-link-check' },
  });
  return response;
}

export async function checkUrl(url) {
  try {
    let response = await request(url, 'HEAD');
    if ([400, 403, 405, 501].includes(response.status)) {
      response = await request(url, 'GET');
    }
    return { url, ok: response.status < 400, status: response.status };
  } catch (error) {
    const reason = error instanceof Error && error.name === 'TimeoutError' ? 'timeout' : 'error';
    return {
      url,
      ok: false,
      status: 0,
      reason: `${reason}: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

async function main() {
  const siteDir = join(import.meta.dirname, '..', '_site');
  const { byPage, urls } = collectFromSite(siteDir);

  for (const page of byPage) {
    console.log(`${page.path}  ${page.urls.length} http(s) href(s)`);
  }

  if (urls.length === 0) {
    console.log('No outbound http(s) hrefs. Empty offer book / brief / docket is valid.');
    return;
  }

  let failed = 0;
  for (const url of urls) {
    const result = await checkUrl(url);
    if (result.ok) {
      console.log(`ok   ${result.status}  ${url}`);
    } else {
      failed += 1;
      console.error(`fail ${result.status || result.reason}  ${url}`);
    }
  }

  if (failed > 0) {
    console.error(`\n${failed} outbound href(s) failed.`);
    process.exit(1);
  }
  console.log(`\n${urls.length} outbound href(s) reachable.`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  main();
}
