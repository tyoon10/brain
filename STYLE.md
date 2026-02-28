# BRAIN NYC — Style Guidelines

> Visual identity for brainyc.org. Minimal, dark, professional.

---

## Design Principles

1. **Dark-first**: Dark background conveys sophistication and tech-forward identity. Light mode supported but dark is the default impression.
2. **Generous whitespace**: Let content breathe. Sections are separated by space, not lines or borders.
3. **Restrained color**: Near-black backgrounds, off-white text, one accent color. No gradients, no clutter.
4. **Typography hierarchy**: Large, bold headings. Lighter, readable body text. Let the type do the work.
5. **Logos as trust signals**: School and sponsor logos displayed cleanly — uniform height, subtle opacity, no visual noise.

---

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| **Background (dark)** | `#0a0a0f` | Hero and primary dark sections |
| **Surface (dark)** | `#111118` | Cards, elevated surfaces |
| **Surface (subtle)** | `#16161d` | Alternate section backgrounds |
| **Text (primary)** | `#f0f0f5` | Headings, primary content |
| **Text (secondary)** | `#a0a0b0` | Subtitles, descriptions, metadata |
| **Text (muted)** | `#6b6b80` | Captions, fine print |
| **Accent** | `#6366f1` | CTAs, links, hover states (indigo) |
| **Accent (hover)** | `#818cf8` | Lighter indigo for hover |
| **Border** | `#1e1e2a` | Subtle card borders, dividers |
| **Background (light)** | `#fafafa` | Light mode background |
| **Text (light mode)** | `#1a1a2e` | Light mode body text |

### Why indigo?
Neutral enough for a multi-school network (no single school's brand color). Professional, tech-forward, distinct from Anthropic orange and school reds/blues.

---

## Typography

| Element | Weight | Size | Tracking |
|---------|--------|------|----------|
| **Hero title** | 800 (Extra Bold) | 4rem / 64px | -0.04em (tight) |
| **Hero subtitle** | 400 | 1.25rem / 20px | normal |
| **Section heading** | 700 (Bold) | 2rem / 32px | -0.02em |
| **Body text** | 400 | 1rem / 16px | normal |
| **Card title** | 600 (Semi Bold) | 1.1rem / 18px | -0.01em |
| **Metadata** | 400 | 0.875rem / 14px | 0.02em |
| **CTA button** | 600 | 0.95rem / 15px | 0.01em |

Font stack: `Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` (HugoBlox minimal theme default).

---

## Layout

- **Max content width**: 960px (narrower than default — more editorial feel)
- **Section padding**: 80px vertical (top/bottom)
- **Hero padding**: 120px top, 100px bottom
- **Card gap**: 24px
- **Logo grid gap**: 48px (schools), 36px (sponsors)

---

## Logo Display

- **Partner school logos**: Height 48px, uniform. Opacity 0.7 → 1.0 on hover. Grayscale in dark mode (filter: brightness(0) invert(1)).
- **Sponsor logos**: Height 32px, uniform. Same opacity treatment.
- **Alignment**: Centered row, flex-wrap for mobile.
- **Dark mode**: White-filtered logos on dark background. Schools use `no-invert` class if logo is already light-safe.

---

## Components

### Hero
- Full-width dark background (`#0a0a0f`)
- Large title, one-line subtitle, short paragraph
- Two CTAs: primary (filled, accent color) and secondary (ghost/outline)
- No image — text-only, clean

### Logo Grids
- Centered flexbox rows
- Subtle horizontal line or extra spacing separates schools from sponsors
- Each logo is a link (opens school/company site in new tab)

### Event Cards
- Dark surface (`#111118`) with subtle border (`#1e1e2a`)
- Image top, title + date + summary below
- Hover: slight lift (translateY -2px) and border brightens
- Two-column grid on desktop, single column on mobile

### Contact Section
- Minimal: heading, one short paragraph, email link
- LinkedIn icon link
- No form (keep it simple)

---

## Dark Mode Logo Handling

| Logo | Dark mode treatment |
|------|-------------------|
| CBS (dark logo on transparent) | `filter: brightness(0) invert(1)` |
| NYU Stern | Same invert filter |
| Cornell Tech | Same invert filter |
| Yale SOM | Same invert filter |
| Anthropic | Same invert filter |
| Lovable | Use `lovable-white.svg` in dark mode, `lovable.svg` in light |
| BizCrush | Same invert filter |
