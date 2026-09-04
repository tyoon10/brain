# Featured local events — newsletter bar

Internal. Not a public page.

**Featured = top hand-curated events happening in the coming week that are:**

1. Highly relevant to the target audience (CBS / Stern / Cornell Tech / Yale SOM business-school students in NYC AI)
2. Sponsored / underwritten by major AI companies **or** big venture funds

The **docket** can list many sittings (`featured: false` is the default). The **weekly newsletter** reads only `featured: true` in the coming-week window. Featured flags feed **future** issues. No issues are published yet; `/newsletter/` stays a designed empty holding page.

## Hard rules

- Time window: **upcoming 7 days** from the newsletter issue date (coming week). Not a month-long dump. Past events are never featured for the newsletter slot.
- Hand-curated short list (aim small: typically a handful, not the full docket).
- Relevance: career/learning value for biz-school AI audience; NYC-anchored (Yale travels in).
- Sponsor bar: host or clear underwriter/sponsor is a **major AI company** (OpenAI, Anthropic, Google, Meta, Microsoft, Amazon, Nvidia, xAI/SpaceXAI, Mistral, etc.) **or a big venture fund** (a16z, Sequoia, Greylock, Benchmark, Lightspeed, Index, Thrive, Founders Fund, etc.). Name the sponsor/host in the event summary when known — do not invent sponsors.
- BRAIN-owned / co-chaired sittings in the coming week may feature even without an outside sponsor (we are the producer).
- Exclude: unsponsored mixers, pure networking, recruiting info-sessions, virtual-only with no NYC hook, events with no date/host page, ticketed student box-office pitches that fail the 11pm test.
- Docket may still list broader events with `featured: false`. Newsletter reads only `featured: true` in the coming-week window.

`featured: true` means eligible for a newsletter feature slot **if** `startsAt` falls in that issue’s coming week. Eleventy exposes `featuredUpcoming`; issue templates (when they exist) must still clip to seven days from the issue date.

## Luna decision

Require all three, or the BRAIN exception:

- (a) in the coming week
- (b) audience relevance
- (c) major AI or big-VC sponsor/host — **or** BRAIN chair / co-chair in the coming week

If the sponsor/host is unknown, decision is `hold` or `exclude`. Never invent a sponsor.

## After Luna

BRAIN-room reviews `ops/triage/out/proposals/`. Founder stamp. A human copies into `data/events/` and runs `npm run ci`. Never auto-publish. Never send a newsletter without stamp.
