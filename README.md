# Roundtable

**BRAIN** — Business Roundtable for AI & Innovation in NYC.

This repository is the Roundtable preview. It is not a personal portfolio and it is not twyoon.com.

Public noun: **Roundtable**. The room is the product. Information is the service.

> New York City, with Yale students joining from New Haven.

The door is free. This is not a box office.

Question 12 (homepage direction) is still open. `/` chooses among `/room/`, `/map/`, and `/table/`.

## Pages

44 public pages in 12 sections. Start at `/sitemap/`.

- `/` — home (sittings, offer book, brief; three directions still open)
- `/room/`, `/map/`, `/table/` — three homepage directions
- `/docket/` — sittings (upcoming always resolves; host pages link out)
- `/offer-book/` — ungated offer book
- `/brief/` — two-lane wire (industry categories + campus)
- `/newsletter/` — holding page; no issues yet
- `/benefits/` — member-benefit ledger
- `/programs/`, `/labs/`, `/freshness/`, `/seats/`, `/door/`

## Public data

Edit files in `data/`. Campus-seat colours are data, not the brand. Partners are names as text only. Every record sets `inferred`. Empty upcoming is valid.

## Develop

```bash
npm install
npm run dev          # http://localhost:4321
npm run ci           # Zod data, copy/kit lint, tests, firewall, build, 44-page count
npm run check:links  # HEAD/GET http(s) hrefs on the four public pages
```

Greenfield [Eleventy](https://www.11ty.dev/) static HTML. Zero client JS by default. Visual system: BRAIN kit v2.0 (docket tokens).

## Unattended jobs (preview branch)

`.github/workflows/preview-unattended.yml` attaches a nightly rebuild and an outbound-link check. Both are **non-deploy**. They no-op unless the run is on `cursor/roundtable-site-e849`.

`.github/workflows/ci.yml` stays a pull-request / push check. It does not deploy.

## Production

GitHub Pages deploy is **not** wired. Do not publish until asked.
