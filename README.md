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

The site is fully static (`output: "static"` is the Astro default). It deploys
to GitHub Pages via GitHub Actions on every push to `main`.

### One-time setup (GitHub Pages)

1. Create a repo on GitHub named **exactly** `rezaenayati.github.io` (the repo
   name is what GitHub uses to route the user site).
2. Push this project to that repo on the `main` branch:

   ```bash
   git init
   git remote add origin git@github.com:rezaenayati/rezaenayati.github.io.git
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git push -u origin main
   ```

3. **Critical**: in the repo, go to **Settings → Pages → Build and deployment**
   and change **Source** from "Deploy from a branch" (the default) to
   **"GitHub Actions"**. If you skip this, GitHub runs Jekyll on every push and
   ignores `.github/workflows/deploy.yml` — Jekyll will then choke on Astro's
   `.astro` frontmatter and fail with `Invalid YAML front matter` errors.
   (`public/.nojekyll` is also committed as a safety net.)
4. The first push to `main` triggers `.github/workflows/deploy.yml`. After it
   succeeds, the site is live at <https://rezaenayati.github.io>.

The workflow uses [`withastro/action@v3`](https://github.com/withastro/action),
which auto-detects pnpm via the `pnpm-lock.yaml` and runs `pnpm build`.

### Continuous deploys

Every subsequent push to `main` rebuilds and redeploys. Manual deploys are
available under **Actions → Deploy to GitHub Pages → Run workflow**.

### Switching to the custom domain (`rezaenayati.me`)

When you're ready to point the custom domain at the same GitHub Pages site:

1. Add a `public/CNAME` file containing exactly:

   ```
   rezaenayati.me
   ```

2. Update `site` in `astro.config.mjs` and `SITE.url` in `src/lib/meta.ts` to
   `https://rezaenayati.me`. Update the `Sitemap:` line in `public/robots.txt`
   too.
3. In your DNS provider, point the apex `rezaenayati.me` at GitHub Pages:
   - `A` records to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`,
     `185.199.111.153`
   - (Optional) `AAAA` records to the IPv6 equivalents listed in the
     [GitHub Pages docs](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).
4. In **Settings → Pages → Custom domain**, enter `rezaenayati.me` and
   wait for the HTTPS certificate to provision (a few minutes, usually).
5. Re-run the deploy workflow so the new sitemap and OG meta tags pick up
   the updated URL.

### Other static hosts (optional)

The build output in `dist/` is plain static HTML/CSS/JS. It also deploys
cleanly to Cloudflare Pages or Vercel without changes — pick `pnpm build`
as the build command and `dist` as the output directory.

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
- [x] GitHub Actions workflow for auto-deploy to GitHub Pages.
- [ ] Replace `public/cv.pdf.placeholder` with the real CV.
- [ ] Push to `rezaenayati.github.io` repo and enable Pages → GitHub Actions.
- [ ] (Optional) Attach `rezaenayati.me` custom domain.
- [ ] Run Lighthouse on prod URL; fix anything below 95.
