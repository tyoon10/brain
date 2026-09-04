# Luna weekly sweep — draft only

Internal agentic layer. **Not shipped to `_site`.** Never writes `data/wire/` or `data/events/`. Never auto-publishes. Never sends a newsletter.

**GPT-5.6 Luna is curator and weekly screener**, not a one-off classifier. Once a week it screens the harvest: industry brief candidates against `CRITERIA.md` + `SOURCES.md`, and local-event candidates against `FEATURED.md` for the **coming-week** newsletter slot. Output is include / exclude / hold plus draft proposals under `ops/triage/out/` only.

## Ownership

- **BRAIN-signal** owns industry-brief cadence (`CRITERIA.md` + `SOURCES.md`).
- **BRAIN-room** owns featured-event cadence (`FEATURED.md`).
- **Chief / founder** stamp before anything is copied into `data/` or goes public (HERMES).

## Cadence

| When | Who | What |
| --- | --- | --- |
| Weekly | Luna | Screen inbox harvest; write proposals |
| Weekly | Signal | Review industry include/hold |
| Weekly | Room | Review featured-event include/hold (handful only) |
| Before data/ | Founder | Stamp |
| After stamp | Human | Copy YAML into `data/wire/` or `data/events/`; `npm run ci` |

Never auto-feed. Never auto-publish. Prefer fewer, sharper includes.

## Hard constraints (industry)

Binding. Also in `data/wire/CRITERIA.md` and `prompts/industry-brief.md`.

1. Never auto-feed or auto-publish — drafts only; founder stamp still required.
2. Wire content: no commentary, no benchmark scoreboards, no personnel gossip.
3. Three M&A states never blurred: announce / rumored / closed stay distinct; SEC for close status.
4. GLM held until explicitly lifted; GLM version and Chinese-lab dates are weak sourcing.
5. Sourcing order from SOURCES.md: company primary weekly → Tier A press only when primary silent on $ or close → Tier B discovery only.

## Featured bar (events)

Coming week only. Highly relevant to CBS / Stern / Cornell Tech / Yale SOM. Host or underwriter is a major AI company or a big VC fund — **or** BRAIN chair/co-chair that week. Unknown sponsor → hold or exclude; never invent. Past events are never featured. See `data/events/FEATURED.md`.

## Pipeline

```
inbox/*.json
    → keyword prefilter (run.mjs)
    → Luna weekly sweep (gpt-5.6-luna)
    → ops/triage/out/proposals/  (YAML draft + decision JSON)
    → Signal (industry) or Room (featured-event) review
    → founder stamp
    → human copy into data/ + npm run ci
```

1. Ingest candidates (RSS / manual paste / Tier A alert / event listings) → `ops/triage/inbox/*.json`
2. Keyword prefilter
3. Luna screens the **week’s** set against CRITERIA+SOURCES or FEATURED
4. Write **proposals** under `ops/triage/out/proposals/` (never `data/`)
5. Human review by Signal or Room
6. Founder stamp
7. Copy into `data/wire/` or `data/events/`; `npm run ci`
8. NEVER auto-commit to `data/`, NEVER auto-publish, NEVER send a newsletter without stamp

## Commands

Dry-run (no API key; CI uses this):

```bash
npm run triage
# node ops/triage/run.mjs --fixture
```

Weekly sweep against inbox (still drafts only):

```bash
# drop this week’s candidate JSON files in ops/triage/inbox/
OPENAI_API_KEY=… node ops/triage/run.mjs --inbox ops/triage/inbox
```

`OPENAI_API_KEY` from env only. Do not commit keys. Model: `OPENAI_MODEL` or `gpt-5.6-luna`.

## Candidate shape

Industry:

```json
{
  "lane": "industry",
  "title": "…",
  "summary": "…",
  "source": "https://…",
  "sourceKind": "primary",
  "publishedAt": "2026-09-02"
}
```

Featured event (also `startsAt`, optional `issueDate`, `relation`, `location`):

```json
{
  "lane": "featured-event",
  "title": "…",
  "summary": "…",
  "source": "https://…",
  "startsAt": "2026-09-08T18:00:00-04:00",
  "issueDate": "2026-09-04",
  "location": "Columbia Business School",
  "relation": "listed"
}
```

`sourceKind`: `primary` | `tier-a` | `tier-b` | `filing` | `other`.

Eleventy exposes `featuredUpcoming` as featured sittings in the coming 7 days. `/newsletter/` has no issues yet.
