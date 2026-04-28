# Personal Website — Build Brief

> Use this document as the prompt for an AI coding agent (or contractor) building **rezaenayati.me**. It contains everything needed to produce a v1 without further questions.

---

## 1. Goal

Build a fast, clean, single-page personal website for **Reza Enayati**, a senior backend engineer with an AI/LLM focus. The site exists to:

1. Give recruiters and hiring managers a credible, professional landing page (better signal than LinkedIn alone).
2. Host **2 in-depth engineering case studies** that wouldn't fit in a CV bullet.
3. Stay alive long-term with minimal maintenance.

**Out of scope for v1:** blog feed, article archive, dated posts, contact form, dark-mode-toggle UI, animations, illustrations, comments, newsletter signups, analytics dashboards, RSS, i18n.

---

## 2. Target audience (in priority order)

1. **Engineering hiring managers at EU startups / scale-ups** (primary). They open the site after a recruiter forwards a CV. They scan for ~30 seconds, click into one case study, and decide if I'm worth a conversation.
2. **Recruiters** scanning to verify the CV is real / I have a public footprint.
3. **Future me** — a stable URL to point people at for the next 5+ years.

The site is **not** for: indie clients, freelance work, conference organizers, content creators, design-agency screenings.

---

## 3. Hard rules

**Do:**
- Mobile-first responsive layout. Most recruiters open links from email on phones.
- Lighthouse performance score 95+, accessibility 95+, on first deploy.
- All content statically rendered. No client-side data fetching for primary content.
- Plain, near-monochrome design. System UI font or one neutral sans (e.g., Inter).
- One subtle accent color for links and headings.
- Print stylesheet so the page prints as a clean document.
- All images optimized (WebP/AVIF, responsive sizes).

**Do NOT:**
- Add hero animations, particle effects, gradient blobs, framer-motion entrance animations, scroll-triggered reveals, or any "creative developer" visual flourishes.
- Add a blog feed with dates and pagination. Articles are a static, fixed list.
- Add a contact form. A `mailto:` link is enough.
- Add tracking beyond simple privacy-friendly analytics (e.g., Plausible / Umami) — and only if explicitly requested.
- Use a CMS, Contentful, Sanity, etc. Content is plain MDX in the repo.
- Use a "Skills" / "Stack" page that duplicates the CV.
- Use heavy frameworks where they're not needed (e.g., no shadcn/ui, no Tailwind animation packages).

---

## 4. Tech stack

- **Framework:** Astro (latest stable). Static-first, MDX support, zero JS by default.
- **Styling:** Tailwind CSS via the official Astro Tailwind integration. Avoid Tailwind plugins beyond `@tailwindcss/typography` (used for case-study prose).
- **Content:** Astro Content Collections (`src/content/`) with Zod schemas for type-safe frontmatter.
- **Markdown extras:** MDX for case studies (so we can embed code blocks with syntax highlighting and the occasional component).
- **Syntax highlighting:** Astro's built-in Shiki with theme `github-dark-dimmed` (or whatever matches a near-monochrome dark accent).
- **Deploy target:** Cloudflare Pages or Vercel (static). Pick Cloudflare Pages for zero-cost forever.
- **Domain:** `rezaenayati.me` (already owned).
- **Package manager:** pnpm.
- **Node version:** Latest LTS (currently 22).
- **TypeScript:** Strict mode enabled.

Do not add: Next.js, React, Vue, Svelte components unless an interactive demo demands them in v2. Astro alone is enough for v1.

---

## 5. Site map

```
/                               → single-page landing (hero, case studies preview, articles preview, currently, contact)
/case-studies/                  → case-study index (lists all)
/case-studies/[slug]            → individual case study (MDX)
/articles/                      → fixed list of long-form essays (lists all; not paginated, not dated)
/articles/[slug]                → individual article (MDX)
/cv                             → redirect to a hosted PDF of the CV (or `/cv.pdf` static asset)
/404                            → custom 404
```

The landing page is the primary entry. The dedicated index pages exist mainly for direct linking and for users who want to see the full list.

---

## 6. File / directory layout

```
.
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
├── public/
│   ├── cv.pdf                        # Reza's exported CV; updated manually
│   ├── favicon.svg
│   └── og-default.png                # 1200x630 Open Graph image
├── src/
│   ├── components/
│   │   ├── Header.astro              # site nav (just logo + 2 in-page links)
│   │   ├── Footer.astro              # email, github, linkedin
│   │   ├── Hero.astro                # landing hero
│   │   ├── CaseStudyCard.astro       # preview card on landing
│   │   ├── ArticleCard.astro         # preview card on landing
│   │   ├── Currently.astro           # "currently" block
│   │   └── Prose.astro               # wraps MDX content with @tailwindcss/typography
│   ├── content/
│   │   ├── config.ts                 # Zod schemas for collections
│   │   ├── case-studies/
│   │   │   ├── mongo-incident-2026.mdx
│   │   │   └── shipping-llm-features.mdx
│   │   └── articles/
│   │       └── .gitkeep              # empty for v1; section hidden if empty
│   ├── layouts/
│   │   └── BaseLayout.astro          # html, head, meta, og, header, footer slot
│   ├── pages/
│   │   ├── index.astro               # landing
│   │   ├── case-studies/
│   │   │   ├── index.astro
│   │   │   └── [...slug].astro
│   │   ├── articles/
│   │   │   ├── index.astro
│   │   │   └── [...slug].astro
│   │   ├── cv.astro                  # redirects to /cv.pdf
│   │   └── 404.astro
│   ├── styles/
│   │   ├── global.css                # tailwind directives + base body styles + print styles
│   │   └── prose.css                 # typography overrides
│   └── lib/
│       └── meta.ts                   # helper for building <head> meta tags (title, description, og)
└── README.md                         # how to run, deploy, add content
```

---

## 7. Author facts (use exactly these — do not invent)

- **Name:** Reza Enayati
- **Tagline / role:** Senior Backend Engineer · AI / LLM
- **Location:** Remote · CET ±2
- **Email:** enayatii.reza@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/reza-enayati/
- **GitHub:** https://github.com/rezaenayati
- **GitLab:** https://gitlab.com/enayatii.reza
- **Domain:** rezaenayati.me
- **Years of experience:** 6+
- **Current role:** Senior Backend Engineer at Evolute GmbH (Germany, Remote), since March 2025
- **Languages spoken:** Persian (native), English (C1, advanced)

---

## 8. Page specs

### 8.1 Landing page (`/`)

A single scrollable page with the following sections, in this order. No nav animations. Section anchors only.

**Hero**
- H1: `Reza Enayati`
- Subhead, smaller weight: `Senior Backend Engineer · AI / LLM`
- One paragraph (verbatim, as starting copy — adjust only if asked):

  > Senior backend engineer with 6+ years of production Node.js / TypeScript experience, currently focused on shipping LLM-powered features end-to-end at [Evolute GmbH](https://evolute.app). I work across Azure OpenAI integrations, MongoDB performance, and clean-architecture / DI-based services.

- Two buttons: `Read case studies` (anchors to #case-studies), `Download CV (PDF)` (links to `/cv.pdf`).
- Inline icon links: GitHub, LinkedIn, Email.
- No image / avatar / illustration.

**Case studies (`#case-studies`)**
- Section heading: `Recent work`.
- One-line lede under the heading: `Two pieces I'm happy to talk about in depth.`
- Grid of `CaseStudyCard` components — one per entry in `src/content/case-studies/`. Each card shows: title, 2-line summary, primary tags (e.g., `MongoDB`, `Performance`, `Postmortem`), reading time estimate.
- Cards link to `/case-studies/[slug]`.

**Articles (`#articles`)**
- Section heading: `Selected writing`.
- One-line lede: `Occasional long-form notes. Not a blog.`
- Hide this section entirely if `src/content/articles/` is empty (it will be in v1).

**Currently (`#currently`)**
- Section heading: `Currently`.
- A short bullet list (3–5 items). Starting content (replace anytime):
  - `Backend lead at Evolute GmbH, focused on LLM-powered customer-experience features.`
  - `Open to Senior Backend / Tech Lead / AI Engineer roles, EU remote (CET ±2).`
  - `Reading: [book or paper title], whatever I'm currently into.`
  - `Tinkering: small AI side-tools.`
- Render in a single column, no icons.
- Add an explicit "Last updated: [Month Year]" caption under the list — set automatically from the file's frontmatter or manually.

**Contact (`#contact`)**
- Section heading: `Get in touch`.
- One paragraph: `For roles, collaborations, or just to say hi — email is the fastest way to reach me.`
- Single big email link: `enayatii.reza@gmail.com`.
- Below: smaller links to LinkedIn, GitHub.
- No form.

### 8.2 Case-study page (`/case-studies/[slug]`)

- Layout: centered single column, max-width ~720px for prose, full-width for code blocks.
- Header block:
  - H1: title.
  - Meta line: tags · reading time · "Updated [Month Year]".
  - One-paragraph TL;DR in italics.
- Body: rendered MDX with `@tailwindcss/typography` and Shiki highlighting.
- Footer: a small "← All case studies" link back to `/case-studies/` and a "← Home" link.
- No comments, reactions, share buttons.

### 8.3 Articles page

Identical layout to case-study page. Skip building this for v1 — leave the route in place but the collection empty.

### 8.4 Case studies index (`/case-studies/`)

A simple list of all case studies (just titles + summaries, no grid). One screen tall typically.

### 8.5 404

Friendly one-liner: `Nothing here. Try the home page.` with a link.

---

## 9. Content collections schema

```ts
// src/content/config.ts
import { defineCollection, z } from "astro:content";

const caseStudies = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        summary: z.string(),
        tags: z.array(z.string()),
        publishedAt: z.string(),    // YYYY-MM-DD
        updatedAt: z.string().optional(),
        readingTime: z.string(),    // e.g., "8 min"
        draft: z.boolean().default(false),
    }),
});

const articles = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        summary: z.string(),
        tags: z.array(z.string()),
        publishedAt: z.string(),
        updatedAt: z.string().optional(),
        readingTime: z.string(),
        draft: z.boolean().default(false),
    }),
});

export const collections = { "case-studies": caseStudies, articles };
```

Hide entries where `draft: true` outside of dev.

---

## 10. v1 case study seeds

Two case studies must exist by v1 launch. Both have **already been written** in some form — adapting them is a matter of editing, not authoring from scratch.

### 10.1 `mongo-incident-2026.mdx`

**Source material:** the existing postmortem at `docs/incident-2026-04-17/incident-2026-04-17.md` in Reza's work repo.

**Adaptation rules (important — treat seriously):**
- **Sanitize all company-specific names**: "Evolute" → "the platform" or "a B2B SaaS I work on", `CampaignTicket` → "a hot collection", `Manufacturer` → "tenant", `getManufacturersCtsAPI` → generic terms. The case study should not reveal Evolute internals or be linkable back to a specific customer.
- Keep the **technical content**: the `$nin` problem, COLLSCAN evidence, fan-out anti-pattern, missing-index proof, remediation tiers. This is what makes the writeup valuable.
- Recast as a **narrative case study**, not a postmortem. Suggested structure:
  1. *TL;DR* (2-3 sentences)
  2. *What we saw* (router timeouts, pool saturation, p95 pinned at 30s)
  3. *Tracing the trigger* (the hot read path)
  4. *Why the query was pathological* (the `$nin` story, with one or two redacted code snippets)
  5. *The amplifiers* (missing index, serial fan-outs, no connection hygiene)
  6. *The fix, laddered* (Tier 0 / 1 / 2)
  7. *What I'd take to the next system*
- Length: aim for ~1,200–1,800 words. Reading time ~8 min.
- Tags: `MongoDB`, `Performance`, `Postmortem`, `Backend`.

### 10.2 `shipping-llm-features.mdx`

**Source material:** Reza's work on the Azure OpenAI campaign-summary pipeline at Evolute (`app/workers/jobs/campaignSummaryGenerationJob.ts` + supporting files in his work repo).

**Authoring rules:**
- Do **not** copy any code from the work repo. This is a **prose case study**, not a code dump.
- Sanitize the same way as 10.1 — no Evolute-specific feature names, no customer references.
- Suggested structure:
  1. *Why we built it* — what business problem an LLM-summary pipeline actually solved
  2. *The shape of the system* — provider abstraction, deployment registry, multi-region failover, structured-output schemas, function calling
  3. *Translation as a separate concern* — keeping per-language outputs deterministic & cheap
  4. *Cost & telemetry* — token-usage accounting, per-language cost breakdown, where the data ends up
  5. *Lessons* — what I'd do differently next time, what surprised me, where the abstractions paid off
- Tags: `AI`, `LLM`, `Azure OpenAI`, `Backend`.
- Length: ~1,200–1,800 words. Reading time ~8 min.
- **Do not claim things Reza hasn't done.** Specifically do not invent: RAG, vector DBs, embeddings, fine-tuning, agents, prompt evals/A-B tests, rate-limit handling. Streaming and fine-tuning may only be mentioned as "next on the list" / "familiar with".

If at v1 only one of these case studies is fully ready, ship with one. The site should still feel complete with a single high-quality case study.

---

## 11. Design principles (cheat sheet for the implementer)

- **Type:** one sans for everything. Heading sizes: H1 ~2.5rem, H2 ~1.5rem, H3 ~1.125rem, body ~1rem. Line-height 1.55 for body, 1.2 for headings.
- **Colors:** near-black on near-white in light mode, near-white on near-black in dark mode (auto via `prefers-color-scheme`). One muted accent color for links — pick one and stick to it (e.g., a desaturated indigo or teal). No second accent.
- **Spacing:** generous vertical rhythm. Sections breathe with at least 4–6rem between them on desktop.
- **No shadows** beyond a single subtle one if used at all.
- **Borders** over shadows for separation.
- **Code blocks** wider than prose, full-width to a sensible max. Always with copy button.
- **Links:** underlined or with a clear visual treatment. No hover-only affordances.
- **Images:** use Astro's `<Image />` component for all images. Skip decorative imagery; only use images inside case studies when they explain something.

---

## 12. Build order (suggested for the implementer)

1. Scaffold Astro + Tailwind + MDX + content collections. Verify dev server runs.
2. Implement `BaseLayout`, `Header`, `Footer`. Get correct `<head>` (title, description, OG image).
3. Implement landing page sections in this order: Hero → Currently → Contact → Case studies preview → Articles preview (hidden). The "lower-information" sections are simpler; build them first to validate the design system.
4. Implement `/case-studies/index.astro` and `/case-studies/[slug].astro` with one placeholder MDX.
5. Adapt the Mongo incident postmortem into `mongo-incident-2026.mdx`. Get it rendering correctly.
6. Adapt the LLM pipeline into `shipping-llm-features.mdx`.
7. Add the 404 page.
8. Add print stylesheet.
9. Optimize images, set up Cloudflare Pages deploy on push, add custom domain.
10. Final pass: run Lighthouse on prod URL. Fix anything below 95 in performance/accessibility.

---

## 13. Acceptance criteria

A v1 ships when **all** of these are true:

- [ ] `rezaenayati.me` resolves over HTTPS to the deployed site.
- [ ] Landing page loads in under 1.0s on a fast connection (Lighthouse).
- [ ] Lighthouse: Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95 — on mobile.
- [ ] At least one case study is published, sanitized, and renders cleanly with code blocks and headings.
- [ ] Hero section, Currently, Contact all render correctly on mobile and desktop.
- [ ] CV PDF downloads from the hero button.
- [ ] All external links open in a new tab and have `rel="noopener"`.
- [ ] Open Graph image and meta tags present so the link previews well on LinkedIn, Slack, Twitter/X.
- [ ] No console errors in production.
- [ ] No content visibly broken in dark mode.
- [ ] Repository has a clear README explaining how to run locally, add a case study, and deploy.

---

## 14. v2 ideas (not for v1 — only if they ask later)

- Live AI demo (token-counter, mini summarizer) using a server-rendered Astro API route + a free OpenAI tier.
- An RSS feed once articles exist.
- Privacy-friendly analytics (Plausible self-hosted or umami).
- A small "Talks" or "Open source" section if material accumulates.
- A second case study on the JS→TS migration at Evolute (the 2-year incremental story).
- A Strapi-as-API-layer case study from Mountain Squad.

---

## 15. Tone & voice

When writing or rewriting copy, follow these rules:

- Plain, direct, calm. No "passionate developer", no "I love clean code", no "rockstar".
- Specific over general. Numbers > adjectives.
- Avoid em-dashes for stylistic flair. Use sentences.
- Avoid "we" when describing things Reza personally did. Use "I" or no-subject ("Designed and shipped...").
- It's OK to admit limits ("I haven't done RAG yet — next on the list."). Honesty signals seniority.

---

## 16. Final note to the implementer

Do not over-build. Reza's strongest signal is the **content** of the case studies, not the chrome around them. If you find yourself spending more than 30 minutes on a single visual element, stop and ship a simpler version of it. We can always iterate.
