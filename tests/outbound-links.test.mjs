import { test } from 'node:test';
import assert from 'node:assert/strict';
import { extractHttpUrls } from '../scripts/check-outbound-links.mjs';

test('extracts http(s) hrefs and skips mailto, hashes, relative paths, and preconnect', () => {
  const html = `
    <a href="/docket/">Docket</a>
    <a href="#content">Skip</a>
    <a href="mailto:contact@brainyc.org">write</a>
    <a href="https://example.com/host">Open the sitting</a>
    <a href="https://example.com/host#top">fragment</a>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Source+Serif+4&display=swap" />
  `;
  assert.deepEqual(extractHttpUrls(html), [
    'https://example.com/host',
    'https://fonts.googleapis.com/css2?family=Source+Serif+4&display=swap',
  ]);
});

test('empty pages yield no invented URLs', () => {
  assert.deepEqual(extractHttpUrls('<p>Nothing is listed yet.</p>'), []);
});
