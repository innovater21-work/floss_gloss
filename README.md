# Floss & Gloss — website

Next.js (App Router, TypeScript) + Tailwind CSS v4, built on the **Warm Family** design system with the brand Indigo & Teal palette.

```bash
npm install
npm run dev      # http://localhost:3000  ·  styleguide at /design-system
npm run build && npm start
```

- Design system docs: [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md)
- Tokens: `src/styles/tokens.css`
- Site copy & data: `src/content/site.ts`

## Logo & photos

The logo and the three clinic photos load straight from the live site (`https://floss-gloss.in/images/…`), allowed in `next.config.ts` → `images.remotePatterns`. The URLs live in `src/content/site.ts` (`ASSET_BASE`, `logo`, `photos`).

To self-host instead, download them into `public/images/` and set `ASSET_BASE = "/images"` (keeping the same sub-paths):

```bash
cd public/images && curl -fsSO https://floss-gloss.in/images/logo.png && mkdir -p infrastructure && for i in 1 2 3; do curl -fsSo infrastructure/$i.jpg https://floss-gloss.in/images/infrastructure/$i.jpg; done
```

If an image can't load, the logo falls back to a text wordmark and photos to a soft gradient placeholder.
