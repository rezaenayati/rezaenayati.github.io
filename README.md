# rezaenayati.me

Personal website for Reza Enayati — senior backend engineer · AI / LLM.

Built with [Astro](https://astro.build) + [Tailwind CSS v4](https://tailwindcss.com).
Static-first, MDX content collections, zero client JS by default.

## Local development

Requirements:

- Node.js ≥ 20 (LTS recommended)
- pnpm 9+

```bash
pnpm install
pnpm dev          # http://localhost:4321
```

## Useful scripts

| Command         | What it does                                                       |
|-----------------|--------------------------------------------------------------------|
| `pnpm dev`      | Start the dev server.                                              |
| `pnpm build`    | Production build → `dist/`. Auto-runs `build:og` first.            |
| `pnpm preview`  | Preview the production build locally.                              |
| `pnpm check`    | Run `astro check` (TypeScript + Astro diagnostics).                |
| `pnpm build:og` | Render `public/og-default.svg` → `public/og-default.png`.          |

## Project layout

```
src/
├── components/      Reusable Astro components (Header, Footer, Hero, cards, …)
├── content/
│   ├── config.ts            Zod schemas for content collections
│   ├── case-studies/        MDX case studies
│   └── articles/            MDX long-form notes (empty in v1)
├── layouts/         BaseLayout (html, head, header, footer)
├── lib/             Helpers (e.g., meta tag builder)
├── pages/           File-based routes
└── styles/          global.css (Tailwind + theme tokens + print)

public/              Static assets (favicon, cv.pdf, og-default.svg/png, robots.txt)
scripts/             One-off Node scripts (build-og.mjs)
```

## Adding content

### A new case study

1. Create `src/content/case-studies/<slug>.mdx`.
2. Add frontmatter that matches the Zod schema in `src/content/config.ts`:

   ```mdx
   ---
   title: "Short, specific title"
   summary: "One- or two-sentence pitch. Shows on the landing page card."
   tags: ["MongoDB", "Performance"]
   publishedAt: "2026-04-25"      # YYYY-MM-DD
   updatedAt: "2026-04-25"        # optional
   readingTime: "8 min"
   draft: false                   # `true` hides it in production
   ---

   ## TL;DR
   …
   ```

3. The entry shows up automatically on `/`, `/case-studies/`, and at
   `/case-studies/<slug>/`. No registration step.

### A new article

Identical, but under `src/content/articles/`. The `Selected writing` section on
the landing page only renders when there's at least one published article.

### Drafts

Set `draft: true` in the frontmatter. Drafts render in `pnpm dev` and are
hidden in production builds.

## Replacing the CV

Replace `public/cv.pdf.placeholder` with a real `public/cv.pdf`. The hero
"Download CV (PDF)" button and the `/cv` route both point to `/cv.pdf`.

## OG image

Source of truth: `public/og-default.svg` (1200×630).

The PNG used by social previews is generated from the SVG via
`scripts/build-og.mjs`, which uses [`sharp`](https://sharp.pixelplumbing.com/)
(already a transitive dependency of Astro). It runs automatically in `prebuild`,
so `pnpm build` always emits a fresh `public/og-default.png`.

To regenerate manually after editing the SVG:

```bash
pnpm build:og
```

## Deploying

The site is fully static (`output: "static"` is the Astro default).

### Cloudflare Pages

1. Connect the repo in the Cloudflare Pages dashboard.
2. Build command: `pnpm build`
3. Build output directory: `dist`
4. Environment variable: `NODE_VERSION=20` (or 22).
5. Add the custom domain `rezaenayati.me` in the Pages → Custom domains tab.

### Vercel

Auto-detected. Default Astro settings work. Add the custom domain in the
Domains tab.

## Conventions

- **Tone & voice:** plain, direct, calm. Specific over general. See
  `personal-website-brief.md` §15.
- **No animations**, no scroll reveals, no hero illustrations. Borders over
  shadows. One muted accent color (`--color-accent`).
- **All external links** must include `target="_blank"` and `rel="noopener"`.
- **All images** in MDX should use Astro's `<Image />` component.

## v1 acceptance checklist

See `personal-website-brief.md` §13 for the source of truth. Headline items:

- [x] Single-page landing with hero, currently, contact, case studies, articles.
- [x] Case studies index + dynamic detail routes.
- [x] Articles index + dynamic detail routes (collection empty in v1).
- [x] `/cv` redirects to the static PDF.
- [x] Custom 404.
- [x] Print stylesheet (clean monochrome).
- [x] OG image, canonical URL, sitemap.
- [x] All external links open in a new tab with `rel="noopener"`.
- [ ] Replace `public/cv.pdf.placeholder` with the real CV.
- [ ] Deploy to Cloudflare Pages, attach `rezaenayati.me`.
- [ ] Run Lighthouse on prod URL; fix anything below 95.
