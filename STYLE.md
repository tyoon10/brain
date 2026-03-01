# BRAIN NYC — Style Guidelines

> Visual identity for brainyc.org. Dark mode only. Minimal, precise, professional.

---

## Design References

The visual identity draws from the best dark-mode SaaS and developer tool landing pages:

**Linear** ([linear.app](https://linear.app)) — The defining reference. Near-black backgrounds, monochrome palette with minimal accent color, Inter Display for expressive headings, single-direction scroll, no visual clutter. Linear uses brand color at 1-10% lightness (never pure #000). Recent 2025 redesign cut back on color further — monochrome black/white with very few bold accents. Key principle: "No zig-zagging content — one-dimensional scrolling, consistently aligned text, minimal CTAs."

**Vercel** ([vercel.com](https://vercel.com)) — Performance-first dark UI. Subtle animated gradients in the hero, generous whitespace, purposeful type hierarchy. Conveys precision and innovation through restraint. Bold use of space with gentle motion cues.

**Resend** ([resend.com](https://resend.com)) — Developer-focused dark landing page. Near-black background, clean card layouts with subtle borders, monospace accents for technical credibility, minimal color.

**Raycast** ([raycast.com](https://raycast.com)) — Dark mode with one bold brand color. Abstract visuals, high contrast, clean component design. Shows how a single accent color can carry the entire palette.

**Stripe** ([stripe.com](https://stripe.com)) — The gold standard for clean landing pages. Bold, concise headlines, strategic CTAs, meticulous spacing. Dark mode sections use deep navy/black with careful contrast.

### Shared Principles Across References

1. **Never pure black** — use near-black with slight color cast (#0a0a0f, not #000000)
2. **Monochrome first** — color is used sparingly as accent, not decoration
3. **One reading direction** — top to bottom, no zig-zag layouts
4. **Type does the heavy lifting** — large bold headings, restrained body text, generous line-height
5. **Space is a feature** — sections breathe with 80-120px padding; content maxes at 960px
6. **Subtle motion** — hover states with translate/opacity shifts, not flashy animations
7. **Logos at reduced opacity** — partner/trust logos shown at 0.5-0.7 opacity, full on hover
8. **Cards have depth** — dark surface + subtle border + lift on hover

---

## Color Palette (Dark Mode Only)

| Token | Hex | Usage |
|-------|-----|-------|
| **Background** | `#0a0a0f` | Page background, hero |
| **Surface** | `#111118` | Cards, elevated elements |
| **Surface (alt)** | `#0d0d14` | Alternate section backgrounds (subtle differentiation) |
| **Text (primary)** | `#f0f0f5` | Headings |
| **Text (body)** | `#c8c8d4` | Body text, descriptions |
| **Text (secondary)** | `#a0a0b0` | Subtitles, metadata |
| **Text (muted)** | `#6b6b80` | Captions, fine print, section labels |
| **Accent** | `#6366f1` | CTAs, links, interactive elements (indigo) |
| **Accent (hover)** | `#818cf8` | Lighter indigo for hover states |
| **Border** | `#1e1e2a` | Card borders, subtle dividers |
| **Border (hover)** | `#2a2a3a` | Brightened border on card hover |

### Why indigo?
Neutral enough for a multi-school network (no single school's brand color). Professional, tech-forward, distinct from Anthropic orange and school reds/blues. Indigo sits in the same family as Linear's accent palette.

---

## Typography

Font stack: `Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` (HugoBlox minimal theme default). Inter chosen because it is the standard for Linear-style dark UI — optimized for screens, excellent at small sizes, and expressive at display scale.

| Element | Weight | Size | Tracking | Line-height |
|---------|--------|------|----------|-------------|
| **Hero title** | 800 | 4.5rem / 72px | -0.04em | 1.0 |
| **Hero subtitle** | 500 | 1.15rem / 18px | normal | 1.75 |
| **Section label** | 700 | 0.85rem / 14px | 0.15em (wide) | — |
| **Card title** | 600 | 1.1rem / 18px | -0.01em | 1.4 |
| **Body text** | 400 | 1rem / 16px | normal | 1.65 |
| **Metadata** | 400 | 0.8rem / 13px | 0.05em | — |
| **CTA button** | 600 | 0.9rem / 15px | 0.01em | — |

### Section headings
Section labels are styled as **uppercase, wide-tracked, muted** — not large bold headings. This follows the Linear/Vercel pattern where section labels are understated markers, not attention-grabbers. The content beneath them carries the visual weight.

---

## Layout

- **Max content width**: 960px (narrower than default — editorial, focused)
- **Hero padding**: 120px top, 100px bottom
- **Section padding**: 60-80px vertical
- **Card gap**: 24px
- **Logo grid gap**: 48px (schools), 36px (sponsors)
- **Single reading direction**: Content flows top to bottom, consistently left-aligned or centered

---

## Components

### Hero
- Full-width, `#0a0a0f` background
- Title: 4.5rem, weight 800, tight tracking
- Subtitle: bold tag ("Business Roundtable for AI & Innovation in NYC")
- Body: 1-2 sentences, max-width 580px, 0.85 opacity
- Two CTAs: primary (filled indigo, rounded 6px) and secondary (ghost/outline, translucent border)
- No image, no gradient, no animation — pure typography

### Logo Grids
- Centered flexbox rows, flex-wrap
- Opacity 0.6 default, 1.0 on hover (smooth 0.3s transition)
- Dark mode: `filter: brightness(0) invert(1)` makes all logos white
- Schools: 48px height, 48px gap
- Sponsors: 32px height, 36px gap
- Subtle CTA below sponsors: "Interested in sponsoring? Get in touch." (0.4 opacity)

### Event Cards
- Two-column grid (desktop), single column (mobile)
- Placeholder image top (16:9 aspect ratio, dark gradient with event type label)
- Title, date, and summary below
- Card background: `#111118`
- Border: 1px solid `#1e1e2a`
- Hover: translateY(-2px) + border brightens to `#2a2a3a`
- Date metadata: uppercase, 0.5 opacity, wide tracking

### Contact
- Two-column layout (HugoBlox default)
- Short paragraph + email link + LinkedIn icon
- Email and links in accent indigo
- No form — minimal, professional

### Navbar
- Semi-transparent background: `rgba(10, 10, 15, 0.85)`
- Backdrop blur: 12px (glassmorphism)
- Subtle bottom border: `rgba(255, 255, 255, 0.05)`
- Right-aligned links
- Dark mode toggle included

---

## Logo Display

### Partner school logos
Height 48px, uniform. Opacity 0.6 → 1.0 on hover. All logos inverted to white in dark mode via CSS filter.

### Sponsor logos
Height 32px, uniform. Same opacity and filter treatment.

### Dark Mode Handling

| Logo | Treatment |
|------|-----------|
| All logos | `filter: brightness(0) invert(1)` — renders white on dark background |
| Logos that are already white/light | Add `no-invert` class to skip the filter |

---

## Event Card Image Guidelines

Each event should have a placeholder image at 800x450px (16:9). Default placeholders use a dark gradient background with:
- Event type label (e.g., "HACKATHON", "WORKSHOP", "MIXER") in uppercase, wide-tracked text
- Subtle accent color tint matching the event category
- No photography required — typographic placeholders maintain the minimal aesthetic

---

## Responsive Behavior

| Breakpoint | Changes |
|------------|---------|
| > 768px | Two-column event cards, full logo grids, hero at 4.5rem |
| ≤ 768px | Single-column cards, wrapped logo grid (smaller logos), hero at 3rem |

---

## Anti-Patterns (What NOT to Do)

- No pure black (#000000) — always use near-black with slight blue cast
- No multicolor gradients — if a gradient is used, it's subtle and two-tone
- No rounded corners > 8px — keep it sharp and precise
- No decorative icons or illustrations — let type and space do the work
- No colored section backgrounds — differentiate with subtle opacity shifts only
- No light mode styling — dark mode is the only mode
