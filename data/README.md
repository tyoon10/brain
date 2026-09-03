# Public data

Source of truth for this Roundtable preview. Each folder is a Zod collection.

| Folder | What it is |
| --- | --- |
| `events` | Sittings on the docket |
| `offers` | Offer book (ungated) |
| `benefits` | Member-benefit ledger |
| `programs` | Campus seats — colours live here as data |
| `campus-programs` | Six campus program rows |
| `wire` | Briefs (industry + campus) |
| `labs` | Nine-lab watchlist |
| `mechanisms` | Freshness mechanisms |
| `partners` | Underwriters and counterparts — names as text only |

Every record needs `inferred: true` or `inferred: false`. Do not invent prices, underwriter status, or sitting facts. If a sitting has a host page, set `href` so the docket links out.

Empty folders are valid. Upcoming always resolves to an array.
