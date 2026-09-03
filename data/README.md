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

Every record needs `inferred: true` or `inferred: false`. Do not invent prices, underwriter status, or sitting facts. If a sitting has a host page, set `href` so the docket links out.

Industry wire items also need `category`: `release`, `acquisition`, `investment`, or `partnership`. Campus items may omit it. Prefer a primary `href`. If a figure or status comes from reporting rather than a company primary source, set `inferred: true` and `inferredNote`.

Empty folders are valid. Upcoming always resolves to an array.
