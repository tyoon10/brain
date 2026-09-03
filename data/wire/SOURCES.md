# Industry brief — sources & cadence

Internal. Not a public page. The public noun is **brief**. This folder is `wire` on disk.

## Rule

Company primary first. Press only when primary is silent on dollars or close status. Reported figures stay labeled reported. Signed-not-closed stays signed-not-closed. Talks stay talks. GLM / Chinese-lab version numbers stay held until the founder lifts that rule. Never invent prices, partners, or close status.

Categories for industry items: `release` | `acquisition` | `investment` | `partnership`.

## Primary (check weekly) — releases & product

| Lab | URL pattern |
| --- | --- |
| OpenAI | https://openai.com/index · https://openai.com/blog |
| Anthropic | https://www.anthropic.com/news |
| Google (Gemini / DeepMind) | https://blog.google (AI / models) · https://deepmind.google/discover/blog |
| Meta | https://ai.meta.com/blog · Meta engineering notes |
| xAI / SpaceXAI | https://x.ai/news |
| Microsoft | https://news.microsoft.com/source · Azure AI blog |
| Amazon / AWS | https://aws.amazon.com/blogs/aws |
| Nvidia | https://blogs.nvidia.com · SEC EDGAR 8-Ks |
| Peer newsrooms | Mistral, Cohere, Perplexity, Anysphere/Cursor, Stripe newsroom — as needed |

If it is not on a primary (or an SEC filing), it is not a release item yet.

## Tier A press — M&A, investments, partnerships when primary is silent

Use as `href` or to mark figures reported:

- Reuters
- Bloomberg / Bloomberg Law
- The Information
- WSJ / FT
- CNBC (market moves OK; prefer Reuters/Bloomberg on deal terms)

## Tier B — discovery only

Fortune, The Verge, TechCrunch. Chase back to primary or Tier A before writing a YAML item.

## Filings

SEC EDGAR (8-K, S-1, merger exhibits) — gold for close status.

## Do not lead on

Twitter/X threads, Substack rumor posts, unnamed “people familiar” without a named Tier A outlet, Discord leaks, aggregator timelines (llm-stats and the like = discovery only).

## How to add an item

1. Confirm category + date in window policy (or note if evergreen).
2. Prefer primary `href`; else Tier A with `inferred` / reported note as the schema requires.
3. Add `data/wire/<slug>.yml` with `slug`, `title`, `publishedAt`, `summary`, `lane: industry`, `category`, `held`, `inferred`, optional `href` / `inferredNote`.
4. Run `npm run ci`.
5. Founder stamp before anything public (HERMES). Preview commits on this branch are fine.

## Cadence (owned by BRAIN-signal)

- Weekly: scan the primary list; draft YAML for anything that clears the bar.
- As-needed: Tier A alerts on mega-deals / mega-rounds.
- Never auto-publish to production. Draft → stamp → commit.
