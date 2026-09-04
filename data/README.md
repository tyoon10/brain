# Public data

Source of truth for this Roundtable preview. Each listed collection folder is a Zod collection.

| Folder | What it is |
| --- | --- |
| `events` | Sittings on the docket |
| `offers` | Offer book (ungated) |
| `benefits` | Member-benefit ledger |
| `programs` | Campus seats — school, program, one line; colours as data |
| `campus-programs` | Six campus program rows |
| `wire` | Briefs (industry + campus). Industry items require `category`. |
| `labs` | Nine-lab watchlist |
| `mechanisms` | Freshness mechanisms |
| `partners` | Underwriters and counterparts — names as text only |
| `newsletters` | Future brief/newsletter issues. Empty; not loaded yet. |
| `wire-archive` | Industry items outside the live window. Not loaded into `/brief/`. |

Docs in those folders (`SOURCES.md`, `CRITERIA.md`, `FEATURED.md`, READMEs) are skipped by the loader. Weekly Luna sweep lives in `ops/triage/` (not a public collection; never copied to `_site`).

Every record needs `inferred: true` or `inferred: false`. Do not invent prices, underwriter status, or sitting facts. If a sitting has a host page, set `href` so the docket links out.

Industry wire items also need `category`: `release`, `acquisition`, `investment`, or `partnership`. Campus items may omit it. Prefer a primary `href`. If a figure or status comes from reporting rather than a company primary source, set `inferred: true` and `inferredNote`. How the industry brief is sourced: `data/wire/SOURCES.md`. Significance bar: `data/wire/CRITERIA.md`. Featured local events (coming-week newsletter slot, not the full docket): `data/events/FEATURED.md`. Weekly Luna sweep (drafts only): `ops/triage/README.md`.

Empty folders are valid. Upcoming always resolves to an array.
