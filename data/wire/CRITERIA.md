# Industry brief — significance bar

Internal. Not a public page. Use with `SOURCES.md`. The public noun is **brief**.

Purpose: surface **only** the most significant news worth posting on the industry brief.

## Hard constraints (BRAIN-signal)

Fold these as written. Do not weaken them.

1. Never auto-feed or auto-publish — drafts only; founder stamp still required.
2. Wire content: no commentary, no benchmark scoreboards, no personnel gossip.
3. Three M&A states never blurred: announce / rumored / closed stay distinct; SEC for close status.
4. GLM held until explicitly lifted; GLM version and Chinese-lab dates are weak sourcing.
5. Sourcing order from SOURCES.md: company primary weekly → Tier A press only when primary silent on $ or close → Tier B discovery only.

## Categories

`release` | `acquisition` | `investment` | `partnership`. An item must match a category **and** clear the bar below.

## Release

**Include signals**

- New frontier / flagship model family or generation (GPT-x, Claude Opus / Fable / Sonnet major, Gemini Pro / Flash major GA, Grok major, Muse / Llama major, and peers on the primary list)
- Major product GA that changes the stack for builders or business students (Computer Use, agents platform, coding agent GA, API family launch)
- Explicit versioned model launch from a watched primary lab

**Exclude**

- Minor patch notes, blog fluff, hiring posts, regional marketing, price tweaks under ~20% unless tied to a named promo the founder already tracks
- Research papers with no product / API ship
- Aggregator “model of the day” without a primary
- GLM / Chinese-lab **version numbers** stay held until the founder lifts that rule (discovery OK; no version claim on the brief)

## Acquisition

**Include**

- Signed definitive agreement **or** closed deal involving a watched lab / major AI infra / major AI app (Cursor, OpenRouter, Hugging Face scale)
- Keywords: acquire, acquisition, merger, definitive agreement, all-stock, wholly owned
- Dollar figure optional; if only press-reported, mark reported

**Exclude**

- “In talks” / “nears deal” without a signed agreement → `held: true` at most, or skip
- Tiny acqui-hires with no strategic weight

## Investment

**Include**

- Mega-round or strategic equity from Amazon / Nvidia / SoftBank / Microsoft / Google / Meta / Apple into a frontier lab, **or** a lab raising at a new landmark valuation
- Keywords: raises, Series, funding round, valuation, strategic investment, closed the round
- Prefer the close date when the announce is old

**Exclude**

- Seed / Series A for unknown tools, grant programs, credit pools without an equity story

## Partnership

**Include**

- Multi-year cloud / chip / distribution partnerships between majors that change who runs whose models (Amazon–OpenAI style, Microsoft terms revision, Nvidia capacity deals)
- Keywords: strategic partnership, multiyear, exclusive distribution, dedicated capacity, joint venture (careful)

**Exclude**

- Logo-on-logo marketing integrations, “powered by” badges, campus club shoutouts

## Match workflow

1. Keyword / heuristic prefilter (title + summary + source)
2. Source gate (primary / Tier A / filing) from `SOURCES.md`
3. Luna **weekly sweep** — curator and screener (`ops/triage/`)
4. Signal review, then founder stamp

Never invent prices, partners, or close status. Talks stay talks. Signed-not-closed stays signed-not-closed. Reported figures stay reported.
