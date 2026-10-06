# Floss & Gloss — Project Context

Reviewed: 2026-10-02

This is the working reference for future changes in this project. Keep visual and component changes aligned with `DESIGN_SYSTEM.md`; treat the JSON files in `src/content/` as the content source of truth.

## Project state

- The actual Next.js app root is this directory (`floss_gloss-harsh` nested inside the opened folder).
- The rebuild now covers the known official first-party site routes: home, about, credentials, gallery, 14 treatment pages, FAQ, blog index, and contact. It also adds a treatment index, a booking-request route, and five visible blog article pages: 28 customer-facing routes total (26 official content destinations plus two utility routes).
- `/design-system` remains a non-indexed design reference page.
- The app uses Next.js 16.3.8 App Router, React 19.2.8, TypeScript 5.9.3, and Tailwind CSS 4.3.3. Fontsource bundles Young Serif and Nunito Sans locally.
- `npm ci --ignore-scripts --no-audit --no-fund` installed 368 dependencies in the app folder. No lifecycle scripts ran.
- There is no Git repository in the opened app folder, so no Git diff/history is available here.
- The official logo, clinic photos, homepage carousel, gallery, certificate scans, policy illustrations, infrastructure carousel, and blog thumbnails load remotely from `https://floss-gloss.in/images/`; `public/images/` contains only `.gitkeep`.
- A Next development server is currently running at `http://localhost:3001`. Port 3000 was already occupied by process 12232 when it started.
- Contact and appointment-request submissions now use server-side Resend routes; the app does not store requests. Appointment CTAs open an accessible booking dialog that links to the verified KiviHealth page; `/book-visit` also retains a request-by-email fallback that does not reserve a slot. KiviHealth showed no available slots when checked on 2026-10-06.
- The credentials route lists published degrees and registration and shows the four official certificate scans in an accessible image lightbox. The scans remain remote, not local assets.

## Source map and data flow

- `src/app/layout.tsx`: shared announcement bar, responsive header, footer, global metadata and icon sprite. It also declares the smooth-scroll behavior expected by Next.js.
- `src/app/page.tsx`: homepage assembly and Dentist structured data.
- `src/app/design-system/page.tsx`: token and component specimen route, excluded from robots indexing.
- `src/app/about/`, `certificates/`, `gallery/`, `treatments/`, `faq/`, `blog/`, `contact/`, `book-visit/`: official-site routes plus treatment index, article detail routes and appointment-request page.
- `src/app/treatments/[slug]/page.tsx`: one shared detail template, statically generated from the treatment list.
- `src/app/blog/[slug]/page.tsx`: one shared article template, statically generated from the blog list.
- `src/content/site.json`: clinic contact and hours, remote image references, age groups, promises, nine clinic features, doctor profile/education/policies, SEO paragraphs, eight recent review excerpts, and 23 FAQs.
- `src/content/treatments.json`: canonical 14 treatment records, unique slugs, categories, icons, page metadata, two content sections per treatment, and legacy source paths.
- `src/content/blog.json`: five official-site article records with dates, author, sections and primary-reference URLs. The tooth-regeneration item is labelled archival/investigational and is not represented as a clinic service.
- `src/content/site.ts`: compatibility facade that imports the JSON files and validates required objects, strings, numbers, booleans, arrays, icon names, categories, and article date shape before exporting typed content. This is static JSON import plus validation; it does not parse runtime user-provided raw JSON with `JSON.parse`.
- `next.config.ts`: remote image allowlist, explicit Turbopack root, and permanent redirects from old official URL paths to the new routes.
- `src/app/sitemap.ts` and `src/app/robots.ts`: sitemap for all 28 customer-facing routes; the design-system route is disallowed.
- `src/components/home/site-header.tsx`: accessible disclosure dropdowns for About and Treatments; one can be open at a time, and clicking the active trigger, clicking outside, or pressing Escape closes it. Escape returns focus to its trigger.
- `src/components/forms/contact-form.tsx`: sends submissions to the Resend-backed contact endpoint and shows success/error states. Form controls tolerate browser-extension-injected attributes such as `fdprocessedid` during hydration.
- `src/lib/server/resend-mail.ts`: server-only Resend REST client with the clinic inbox as its fixed recipient and an optional verified sender override.
- `src/lib/server/form-security.ts`: bounded JSON body parsing, field cleanup, same-origin validation, and in-memory submission throttling for the public forms.
- `RESEND_SETUP.md`: local API-key instructions and production sender-domain setup.
- `src/components/forms/booking-request-form.tsx`: appointment details are sent through the Resend-backed booking request endpoint when configured; the app does not store the request and it does not reserve a slot.
- `src/components/forms/kivi-booking-widget.tsx`: shared appointment CTA and accessible native dialog. KiviHealth refuses to display its booking page in an iframe on localhost, so the dialog opens the provider’s booking page in a new tab and links to the email-request fallback.
- `PROJECT_CONTEXT.md`: persistent project/design/comparison reference. Keep it updated when routes, content or site scope changes.
## Design system — the constraints for future UI work

**Direction:** “Warm Family” (Layout 4 from the homepage concepts), using the clinic’s Indigo & Teal brand palette. The effect is friendly, rounded, warm, and unhurried: Young Serif headlines, Nunito Sans body copy, teal washes, arch-shaped photography, pill controls, calm rounded cards, and occasional hand-drawn/tilted details.

### Tokens

| Role | Token | Value |
|---|---|---|
| Primary indigo | `--fg-primary` | `#332C84` |
| Accent teal | `--fg-accent` | `#068CA0` |
| Soft teal wash | `--fg-soft` | `#E3F3F6` |
| Page / surface | `--fg-bg`, `--fg-surface` | `#FFFFFF` |
| Alternate surface | `--fg-bg-alt` | `#F3F5FB` |
| Lines | `--fg-line` | `#E2E6F0` |
| Main text | `--fg-ink` | `#0E1533` |
| Supporting text | `--fg-muted` | `#5B637A` |
| Dark band/footer | `--fg-dark` | `#0B1440` |
| On dark / dim | `--fg-on-dark`, `--fg-dim` | `#FFFFFF`, `#AEB6D3` |
| Stars | `--fg-star` | `#F5B301` |

Additional explicit on-primary/on-accent white tokens are defined. Tailwind’s default color palette is reset; use the brand utilities (e.g. `bg-primary`, `text-muted`, `border-line`) instead of introducing arbitrary palette colors.

### Type, shape, rhythm

- Display: Young Serif 400, `text-display` = `clamp(42px, 6.4vw, 84px)`; section title `text-h2` = `clamp(32px, 4vw, 50px)`. Other title tokens are `text-h2-lg` (max 52px), `text-h2-xl` (max 56px), `text-h2-sm` (max 42px).
- Body: Nunito Sans, 17px/1.6; lead 19px; supporting/card copy usually 15px. Eyebrows use Young Serif, 18px, teal.
- Radii: pill 99px; 20/22/24px small-to-large surfaces; card 28px; xl 32px; band 40px; signature arch `999px 999px 28px 28px` (large arch ends at 32px); leaf is reserved for the fallback logo mark.
- Container `wrap`: max 1200px, 24px gutters (16px below 601px). Section rhythm: 104px vertical, 72px below 641px. Centered section headers max 680px.
- Breakpoints are deliberately desktop-first: `max-sm` <=600px, `max-md` <=640px, `max-lg` <=1000px; configured `sm`/`md`/`lg` are 601/641/1001px. Match existing max-* conventions.
- `shadow-sticker` is intended for circular rating stickers, not a general card shadow.

### Component/pattern language

- `ButtonLink` / `Button`: pill only; primary, accent, outline, outline-on-dark variants; md/sm sizes; bold, lifts 2px on hover. Keep link semantics for navigation and button semantics for actions.
- `Pill`: trust badges, credentials, and compact tags.
- `Eyebrow`, `SectionHeader`, `Stars`: shared typography primitives.
- `Icon`: 36 inline SVG icons in a single sprite mounted once at the root; 24-unit grid, 1.8 stroke, round caps/joins, inherits `currentColor`. Extend `IconName` and sprite together when adding an icon.
- `Photo`: reserved-size gradient and label fallback; remote `next/image` overlays it if load succeeds.
- `Logo`: remote official mark; text/tooth fallback; dark tone becomes white silhouette.
- Alternating card tint: odd/even card visual treatment as documented; dark band promise tiles use translucent white tints/borders; rows use dashed dividers; the doctor photo uses a shifted arch outline; reviews use three-column masonry and subtle rotations; hero uses SVG hand-drawn underline and round rating/year stickers.
- Prefer the tokens and shared primitives over adding one-off styling. Use `cn()` when conditionally combining classes so Tailwind conflicts resolve correctly.

## Implemented route and content inventory

- Static routes: `/`, `/about`, `/certificates`, `/gallery`, `/treatments`, `/faq`, `/blog`, `/contact`, `/book-visit`.
- Treatment detail slugs: `scaling-polishing`, `periodontal-gum-surgery`, `tooth-coloured-fillings`, `root-canal-treatment`, `crown-and-bridge`, `dental-implants`, `dentures`, `smile-designing`, `veneers`, `cosmetic-treatment`, `orthodontics-invisalign`, `tooth-extraction`, `wisdom-tooth-surgery`, `pediatric-dentistry`.
- The official navigation's 14 treatment paths and the older About, Certificates, Gallery, FAQ, and Contact paths redirect permanently to their new canonical routes.
- There are five blog detail routes corresponding to the five visible official posts; titles, dates and source references live in `src/content/blog.json`.
- The responsive header has six main route links plus an appointment CTA. Appointment buttons open the shared KiviHealth dialog; its direct external link and the `/book-visit` email-request fallback remain available. Call and WhatsApp remain direct contact links.
- Treatment details and article details have route-level metadata, canonical URLs, JSON-LD structured data, and are included in generated sitemap entries.
- The full FAQ route contains 23 data-backed questions. The home FAQ section is a featured subset of the same JSON list.
- Doctor biography and education are presented from JSON. Vision, mission, and quality policy use accessible tabs with their official supporting images.

## Official site comparison and implementation status (checked 2026-10-06)

The official navigation exposes 21 first-party core destinations: home; three About destinations (profile, certificates, gallery); 14 treatment pages; FAQ; blog index; and contact. Its booking link leads to KiviHealth, an external service. The official blog showed five visible articles on the review date. This rebuild now has all 21 core routes and those five article routes, plus `/treatments` and `/book-visit` as utility routes: 28 customer-facing routes. The booking CTA uses the clinic-specific KiviHealth URL supplied by the clinic; blog pagination and older posts not visible in the current listing were not counted.

The rebuild keeps the existing Warm Family / Indigo & Teal visual language from the design guide while adding dedicated editorial, informational and service templates. The original one-page flow has become a multi-route site. Exact final visual parity still needs a browser review at desktop and mobile widths.

### Remaining decisions and content dependencies

- Replace the official-host image references with clinic-approved local assets if local/offline reliability is required; the current routes depend on the official image host and network access.
- Confirm rating/review counts, clinic details, published qualifications, treatment wording, and policy copy with the clinic before launch; these are content records, not independently verified live operational data.
- Contact forms and the alternative appointment-request form submit email through the server-side Resend API. The app does not write these requests to a database. KiviHealth owns the live booking workflow. Its page loaded directly but refused iframe embedding on `localhost:3001`, so the shared dialog opens it in a new tab instead of showing a broken frame. The provider showed no available slots on 2026-10-06; clinic staff may need to publish availability.
- `/book-visit` offers the direct KiviHealth booking page plus an email-request fallback. A successful email request is not a confirmed appointment and does not reserve a time.
- Desktop and mobile dropdown switching, outside-click dismissal and Escape dismissal are browser-checked; remote-image rendering still depends on the official image host.
- Homepage parity additions include the three-slide hero banner, seven-photo infrastructure carousel, direct callback anchor, and Facebook/Instagram links. The reviews section links directly to Google Write a Review.
- Gallery and credentials pages show all four source photos/scans in keyboard-accessible lightboxes. Blog cards and article pages now include the five official post thumbnails.
- Contact form includes editable Subject and Reset controls; submissions now send through the server rather than opening an email draft.
- The replacement domain and deployment environment are not configured by this source change; metadata and sitemap currently use the official `https://floss-gloss.in` domain.

### Functional and content audit (2026-10-06)

- Smoke-checked all 28 customer-facing URLs (nine static routes, 14 JSON-driven treatment details, and five JSON-driven articles), plus `/sitemap.xml` and `/robots.txt`; every URL returned HTTP 200 on the local server.
- Parsed all three content files and checked for duplicate treatment/article slugs, repeated FAQ questions, missing treatment legacy paths, empty treatment/article sections, invalid article date shapes, and non-HTTP external URLs. Counts: 14 treatments, 23 FAQs, five articles; no issues found in these checks.
- The content layer imports repository-owned JSON at build time and validates its required field types, values, icon names, categories and dates. It is not a runtime parser for arbitrary uploaded/user-provided JSON.
- The customer-facing links all point to implemented local routes or configured phone, email, WhatsApp, map, and reference destinations. `href="#"` appears only in the non-indexed design-system component specimen page.
- Callback phone text and its `tel:` link now use the shared clinic record in `src/content/site.json`, avoiding a separately hard-coded contact value.
- Contact and appointment-request forms now show sending, success, and error states, keep visitor details in the form, and provide email/phone/WhatsApp alternatives if delivery fails. They use server-side field validation, same-origin checks, an invisible spam trap, and a small in-memory request limit.
- `src/app/api/contact/route.ts` and `src/app/api/booking/route.ts` call Resend from the server. The API key is read only from private `RESEND_API_KEY`; messages go to the clinic email in `src/content/site.json`, with a valid visitor email set as Reply-To. The app does not save email content.
- `.env.local` is ignored by Git and prefilled with a blank API-key line and Resend's test sender. `.env.example` and `RESEND_SETUP.md` explain local configuration and the verified-domain sender step for production. On 2026-10-06 the supplied key was accepted by a read-only Resend domains request, but `floss-gloss.in` was not configured in that account; no real email was sent. Resend may restrict test sender delivery to account-approved recipients, and a verified clinic-owned domain is needed for the clinic's own sender address.
- Before the Resend integration, `npm run lint`, `npx tsc --noEmit`, and `npm run build` passed. After the Resend integration, `npm run lint` and `npx tsc --noEmit` pass; the production build and live email delivery have not yet been rerun with a real API key.

### Verification record

- All three content JSON files were parsed successfully and contain 14 treatments, 23 FAQs, and five articles.
- `next build` completed successfully with `/book-visit` statically generated, TypeScript passed, and sitemap/robots output included.
- The appointment-request form was browser-checked with sample values and produced a `mailto:` draft before the Resend server integration.
- Desktop/mobile dropdown checks confirmed exclusive open, trigger close, outside click, Escape, and mobile switching behavior.
- Next.js processes required running outside the sandbox; the development server is serving at `http://localhost:3001`.
- Rechecked official-site destination parity against the live first-party navigation: all 21 core destinations are represented, including every treatment page, plus the five visible article details and the two utility routes.
- Added the official three-slide homepage banner, seven-image clinic carousel, four-image gallery and certificate lightboxes, three policy tabs, five blog thumbnails, the original contact form Subject/Reset controls, callback links, Google review CTA, and Facebook/Instagram links.
- Browser verification confirmed the About tabs switch, both image galleries open/navigate/close, the former contact draft included the entered Subject and Reset restored its initial fields, and homepage carousel controls switch slides. No draft was opened or sent.
- All 28 customer-facing routes returned HTTP 200 after the changes. The certificate, gallery, blog-detail, clinic, and doctor images tested successfully from the official image host; homepage browser logs showed no console errors.
- Latest `npm run lint`, `npx tsc --noEmit`, and `npm run build` pass. The first restricted build attempt hit `spawn EPERM`; the build completed after the Next.js worker subprocess was permitted.
- The exact KiviHealth booking URL in the forwarded email was opened and verified for Dr. Archana Mal. Its direct booking page loads; an iframe test returned “kivihealth.com refused to connect.” Appointment buttons therefore use a themed accessible dialog with a direct new-tab link rather than injecting the supplied jQuery/Bootstrap globals or leaving a blank iframe. The homepage Dentist JSON-LD now includes a valid Schema.org `ReserveAction` pointing at that booking URL.
- Browser verification confirmed that the header and `/book-visit` CTAs open the shared dialog, its close button and Escape key dismiss it, and “Use the clinic request form” navigates back to the local fallback. The main, booking, and contact routes return HTTP 200 after the integration.
