# Reviewer note

Canonical preview for **https://github.com/tyoon10/brain** only. Do not merge. Do not publish. Do not treat this PR as a production cutover to `brainyc.org` or twyoon.com.

## Visual system

BRAIN kit **v2.0 (“docket”)** is the locked token set: canvas `#f2f3f0` / dark `#121412`, surface `#e9ebe6`, ink `#1a1c19`, accent `#1e4d45` (actions only; dark `#8fb5ab`). Type: Source Serif 4 for display and body, IBM Plex Sans for UI, IBM Plex Mono for dates and chips. Tabular numerals on dates and figures. Radii 0 / 4 / 999. Zero shadows.

The shell is a 12-column grid that uses the viewport. Prose measure is for prose only. Wordmark is type: Roundtable + BRAIN. No mark box. No contact address.

This is **not** Parchment & Navy, **not** twyoon.com, and **not** the retired Hugo Alliance landing page.

## Homepage direction (Question 12)

Still **open**. `/` leads with the 11 sittings, the offer book, and the two-lane brief. `/room/`, `/map/`, and `/table/` are first-class homepage directions. Empty upcoming is a designed rail, not the hero.

## What a reviewer should click

- `/` — dense home: sittings, wire, offers, time-to-value
- `/room/`, `/map/`, `/table/`
- Atlas `/sitemap/` — 44 pages in 12 sections
- Docket `/docket/` — 11 past sittings; upcoming empty to the side
- Offer book, brief, newsletter (empty holding page), benefits, programs, labs, freshness, seats, door

Public copy is Roundtable lexicon. Names as type. No partner marks. Register links out. Eligibility inferred is marked inferred. Wispr door is `https://wisprflow.ai/students`.

## Unattended jobs

Preview branch only (`cursor/roundtable-site-e849`): nightly rebuild and outbound-link checks. They never deploy.

## Repo description

This agent cannot change the GitHub repository description (read-only). It still says “NYC AI Alliance”. That name is not used on the public pages.

## Cutover

CI validates and builds. It does not deploy.

## Industry brief data source

`data/wire/` is the live brief. Industry items cover 2026-03-03 through 2026-09-03 and require `category`: `release`, `acquisition`, `investment`, or `partnership`. Campus items may omit `category`. `data/wire-archive/` is not loaded. `data/newsletters/` is empty; `/newsletter/` is a designed holding page with no issues.

To add a wire item:

1. Create `data/wire/<slug>.yml`.
2. Set `slug`, `title`, `publishedAt` (YYYY-MM-DD), `summary` (one to three sentences), `lane`, `held`, and `inferred`.
3. Industry items also need `category`. Prefer a primary `href`.
4. If a figure or status comes from reporting rather than a company primary source, set `inferred: true` and `inferredNote`.
5. Do not invent closed deals, prices, or contact info. Talks stay talks. GLM stays `held: true` with no version number.
6. Optional: add the slug to `briefPageSlugs` in `eleventy.config.js` for a detail page (that changes the public page count).
7. Run `npm run validate` then `npm run ci`. If you add a public route, update `scripts/assert-pages.mjs`.

