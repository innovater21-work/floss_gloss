# Floss & Gloss — Design System

**Direction:** Warm Family (Layout 4 from the homepage concepts)
**Palette:** Brand — Indigo & Teal

Friendly, rounded and unhurried. Serif headlines with a hand-written feel, soft teal washes, arch-shaped photos and pill-shaped everything. Live styleguide: run the app and open **`/design-system`**.

## Where things live

| What | File |
|---|---|
| Design tokens (framework-agnostic CSS variables) | `src/styles/tokens.css` |
| Tailwind mapping, breakpoints, base styles, helper utilities | `src/app/globals.css` |
| UI primitives | `src/components/ui/*` |
| Homepage sections | `src/components/home/*` |
| Copy & data (treatments, reviews, FAQ, contact) | `src/content/site.ts` |
| Logo & photos | `https://floss-gloss.in/images/` (see `ASSET_BASE` in `src/content/site.ts`) |

## Colour

| Tailwind | Token | Hex | Use |
|---|---|---|---|
| `primary` | `--fg-primary` | `#332C84` | Main buttons, logo mark, icons on light |
| `on-primary` | `--fg-on-primary` | `#FFFFFF` | Text/icons on primary |
| `accent` | `--fg-accent` | `#068CA0` | Eyebrows, highlight word, secondary CTA, icon dots, ribbon |
| `on-accent` | `--fg-on-accent` | `#FFFFFF` | Text/icons on accent |
| `soft` | `--fg-soft` | `#E3F3F6` | Alternate card tint, open FAQ, count badges |
| `bg` | `--fg-bg` | `#FFFFFF` | Page |
| `bg-alt` | `--fg-bg-alt` | `#F3F5FB` | Banded section, nav hover, list-icon circles |
| `surface` | `--fg-surface` | `#FFFFFF` | Cards |
| `line` | `--fg-line` | `#E2E6F0` | Borders, dashed dividers |
| `ink` | `--fg-ink` | `#0E1533` | Text |
| `muted` | `--fg-muted` | `#5B637A` | Supporting text |
| `dark` | `--fg-dark` | `#0B1440` | Calm band, footer |
| `on-dark` | `--fg-on-dark` | `#FFFFFF` | Text on dark |
| `dim` | `--fg-dim` | `#AEB6D3` | Secondary text on dark |
| `star` | `--fg-star` | `#F5B301` | Rating stars |

Translucent helpers for the dark band (sRGB `color-mix`, exactly as designed):
`tint-dark-7`, `tint-dark-8` (backgrounds), `border-dark-12`, `border-dark-15`, `border-dark-35`, `text-accent-on-dark`, `bg-accent-25`.

Tailwind's default colour palette is switched off (`--color-*: initial`) so only brand colours can be used.

## Typography

| Role | Font | Size | Notes |
|---|---|---|---|
| Display (hero h1) | Young Serif 400 | `text-display` = clamp(42px, 6.4vw, 84px) | line-height 1.12, tracking −0.01em |
| Section h2 | Young Serif | `text-h2` = clamp(32px, 4vw, 50px) | variants: `text-h2-lg` (52), `text-h2-xl` (56), `text-h2-sm` (42) |
| Card h3 | Young Serif | 26px / 21px | |
| Eyebrow (`<Eyebrow>`) | Young Serif | 18px, accent | sits above every h2 |
| Body | Nunito Sans (variable, opsz) | 17px / 1.6 | |
| Lead | Nunito Sans | 19px, muted | |
| Small / card copy | Nunito Sans | 15px, muted | |
| Buttons, pills, nav | Nunito Sans | 13–15px, 700–800 | |

All `h1–h3` get Young Serif 400 automatically from the base layer. Fonts are self-hosted via `@fontsource` (no runtime call to Google Fonts).

## Shape

| Tailwind | Value | Use |
|---|---|---|
| `rounded-pill` | 99px | Buttons, pills, nav |
| `rounded-sm` | 20px | Quote block |
| `rounded-md` | 22px | FAQ items |
| `rounded-lg` | 24px | Promise tiles |
| `rounded-card` | 28px | Age cards, treatment groups |
| `rounded-[26px]` | 26px | Review cards |
| `rounded-xl` | 32px | Visit card, map |
| `rounded-band` | 40px | Dark band, footer top |
| `rounded-arch` / `rounded-arch-lg` | 999px 999px 28/32px | **Signature** arch photos |
| `rounded-leaf` | 50% 50% 50% 14px | Fallback logo mark only |

Shadow: `shadow-sticker` (`0 18px 30px -16px rgba(0,0,0,.35)`) — only on the round rating stickers.

## Layout

- Container: `wrap` utility — max 1200px, 24px gutters (16px ≤600px).
- Section rhythm: `section-y` — 104px top/bottom (72px on phones).
- Section headers are centred, max 680px, 56px below.
- Breakpoints are desktop-first, matching the design: `max-lg:` ≤1000px, `max-md:` ≤640px, `max-sm:` ≤600px.

## Components (`src/components/ui`)

- **`ButtonLink` / `Button`** — variants `primary`, `accent`, `outline`, `outline-on-dark`; sizes `md` (15×26) and `sm` (10×18). Pill, 800 weight, lifts 2px on hover.
- **`Pill`** — `md` trust badge, `sm` credential chip, `xs` tag chip. Optional accent icon.
- **`Eyebrow`, `SectionHeader`, `Stars`** — typography helpers.
- **`Icon`** — 36 line icons from one inline sprite (`IconSprite` is mounted once in the root layout). 24-grid, 1.8 stroke, round caps, inherits `currentColor`, 1.15em default. Circle-icon pattern: `size-14 rounded-full p-3.5 bg-primary text-on-primary`.
- **`GoogleLogo`** — full-colour G.
- **`Photo`** — gradient + label placeholder that is replaced by `next/image` when the file exists.
- **`Logo`** — the clinic's own logo (`logo.png`, 269×81, round tooth mark + "FLOSS & GLOSS DENTAL CLINIC"). Header and footer at 56px tall (44px on phones). `tone="dark"` turns it into a white silhouette for the dark footer. Falls back to a text wordmark if the image fails.

## Patterns

- **Alternating tint:** in card grids, odd items are `bg-soft` (no border) with accent icons; even items are `bg-surface` with border and primary icons.
- **Hand-drawn underline** under the highlight word in the hero (SVG stroke in accent).
- **Tilted review cards:** every 3rd starts tinted, the next two rotate −1° / +1° in a masonry (`columns-3`).
- **Dashed dividers** (`border-dashed border-line`) for list rows and opening hours.
- **Offset outline** behind the doctor photo — the same arch shape shifted 18px.
