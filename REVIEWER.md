# Reviewer note

Canonical preview for **https://github.com/tyoon10/brain** only. Do not merge into `tyoon10.github.io`. Do not treat this PR as a production publish.

## Visual system

BRAIN kit **v2.0 (“docket”)** is imported as the locked token set: canvas `#f2f3f0` / dark `#121412`, surface `#e9ebe6`, ink `#1a1c19`, accent `#1e4d45` (actions only; dark `#8fb5ab`). Type: Source Serif 4 for display and body, IBM Plex Sans for UI, IBM Plex Mono for dates and chips. Radii 0 / 4 / 999. Zero shadows.

This is **not** Parchment & Navy, **not** twyoon.com, and **not** the retired Hugo Alliance landing page. Those stacks were removed rather than extended.

## Homepage direction (Question 12)

Still **open**. This preview is a quiet index — campus seats, next sitting, offer book and docket — so Room vs Map vs a third is not locked in layout or in copy.

## Facts

Campus seats (CBS, Stern, Cornell Tech, Yale SOM) and the Yale line are confirmed. Seat colour values stay in `data/programs` as swatches only. Public surface is names in type, plus a reserved empty mark slot — no partner/school mark files, no favicon scrapes, no generated stand-ins. Offer book, wire, partners, and the docket are empty by design: nothing was invented, and prior-site sittings were not carried forward without reconfirmation. `upcoming()` still resolves.

CI `assert:firewall` fails if `static/media/logos/`, Hugo (`hugo.yaml`, `go.mod`, `layouts/`, `content/`), or mark image files return.

## Unattended jobs

Preview branch only (`cursor/roundtable-site-e849`):

1. **Nightly rebuild** — `workflow_dispatch` plus weekday `schedule` at 12:00 UTC. Runs `npm ci` and `npm run ci` so Eleventy recomputes upcoming. Never deploys.
2. **Outbound-link checks** — after that build, HEAD/GET http(s) `href`s from `/`, `/offer-book/`, `/docket/`, `/brief/` only. Fails on 4xx/5xx/timeouts. `mailto:` and hashes are skipped. Empty collections are valid. No URLs are invented.

`schedule` does not fire until the workflow file exists on the default branch. Use workflow_dispatch on this branch until then. Jobs no-op on any other ref.

## Repo description

This agent cannot change the GitHub repository description (read-only). Brand noted it still says “NYC AI Alliance”. That name is not used on the public pages; please set the description to Roundtable / BRAIN in the repo settings.

## Cutover

CI and the unattended jobs validate and build. They do not deploy. `brainyc.org` stays as it is until an explicit publish is asked for.
