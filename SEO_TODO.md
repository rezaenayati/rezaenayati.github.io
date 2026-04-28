# SEO checklist

Actions to improve search visibility, with priority on **name-search SEO**
("Reza Enayati"). Check items off as they're done. The on-site technical work
(JSON-LD, sitemap, canonical URLs, fast static HTML) is already in place — this
list is mostly off-site signals and getting Google to crawl + index.

> **Reminder:** name SEO takes 4–12 weeks to settle. Don't measure progress in
> days. The single biggest lever is Phase 1, step 1 — everything else
> compounds slowly on top of indexed pages.

---

## Phase 1 — Foundation (do this today)

- [ ] **Submit site to Google Search Console**
  - <https://search.google.com/search-console>
  - **Add property** → **URL prefix** → `https://rezaenayati.me` (the canonical
    custom domain, not the github.io URL).
  - Verify via **HTML tag**: paste the meta tag value into `BaseLayout.astro`'s
    `<head>` (ask Cursor to do this once you have the value).
  - **Sitemaps** → submit `sitemap-index.xml`.
  - **URL Inspection** → request indexing for: home, each case study, each
    article. Manual but it triggers a priority crawl.
  - Optional: also add `https://rezaenayati.github.io` as a second property so
    you can monitor the legacy URL during the migration. Both should be
    verified; the github.io one will gradually drop out of the index as Google
    follows the 301 redirects.

- [ ] **Submit site to Bing Webmaster Tools**
  - <https://www.bing.com/webmasters>
  - Use the **Import from Google Search Console** option (one-click).
  - Submit the same sitemap.
  - Bonus: feeds DuckDuckGo's results too.

- [ ] **Add site URL to LinkedIn**
  - Profile → Contact info → Website → `https://rezaenayati.me`
  - Label: "Personal Site" or "Portfolio".
  - LinkedIn is the highest-authority backlink for a name search.

- [ ] **Add site URL to GitHub profile**
  - Profile → Edit profile → **Website** field → enter the URL.
  - Update the bio to include role + site if not already.

- [ ] **Add site URL to GitLab profile**
  - Same pattern. Smaller signal but free.

- [ ] **Confirm name spelling consistency**
  - "Reza Enayati" appears exactly (no "R. Enayati", no "Reza E.") on:
    LinkedIn, GitHub, GitLab, the site itself, any other public profile.
  - Google does exact-string matching for entity disambiguation.

---

## Phase 2 — Verification (1–3 days after Phase 1)

- [ ] **Verify Person + Article schema is detected**
  - <https://search.google.com/test/rich-results>
  - Test the home page → confirm `Person` schema with `sameAs` links to your
    three profiles.
  - Test one case study → confirm `TechArticle` schema is detected.
  - Test one article → confirm `Article` schema.
  - Screenshot and send to Cursor if any errors come back.

- [ ] **Confirm site is indexed**
  - Google search: `site:rezaenayati.me`
  - Should return the home page + case studies + articles within 1–3 days
    of submitting in Search Console.
  - If still empty after a week: Search Console → **Coverage** report.

---

## Phase 3 — Authority signals (this month)

- [ ] **Add a profile photo on GitHub** (if comfortable)
  - Google reads `https://github.com/<user>.png` for knowledge-panel images.
  - Optional: add `image: "https://github.com/rezaenayati.png"` to
    `personSchema()` in `src/lib/meta.ts` so we explicitly tell Google which
    photo represents you.
  - Note: this does NOT add an avatar to the site itself — only to the
    structured-data signal.

- [ ] **Create a GitHub README profile**
  - Create a new repo named exactly `rezaenayati` (different from the
    `rezaenayati.github.io` Pages repo).
  - Add a `README.md` with a short bio + a link to the site.
  - GitHub auto-displays it at the top of your profile page.

- [ ] **Cross-post one article on dev.to or Hashnode**
  - Suggested first post: *Reading explain plans without panicking* — short,
    technical, broadly useful.
  - At the top of the cross-posted version, include:
    `Originally published at https://rezaenayati.me/articles/reading-explain-plans-without-panicking/`
  - Set the canonical URL on dev.to to your site (dev.to has a "Canonical URL"
    field). This tells Google the original is yours; the cross-post is just a
    backlink.
  - dev.to has high domain authority and good name-anchor backlinks.

- [ ] **Bio + URL on any other dev platform you use**
  - Hacker News profile (about field), Lobste.rs, Stack Overflow, etc.
  - Skip if you don't already have an account; don't create accounts just for
    this.

- [ ] **One open-source contribution that ties your GitHub profile to your name**
  - A merged PR to a popular project in your stack (Astro, Mongoose, Zod,
    a TypeScript lib, etc.). Even a small docs fix counts.
  - This isn't direct SEO — it's reputation that compounds when recruiters
    look you up.

---

## Phase 4 — Monitoring (4 weeks after Phase 1)

- [ ] **Check name-search position**
  - Search Console → **Performance** → filter by query "reza enayati" → check
    average position.
  - Goal: top 3 within 8 weeks. LinkedIn typically dominates first.

- [ ] **Verify all content pages are indexed**
  - Search Console → **Coverage** report → "Indexed" count should equal:
    1 (home) + 1 (case-studies index) + 2 (case studies) + 1 (articles index)
    + 3 (articles) + 1 (404) ≈ **9 pages** plus sitemap/RSS.
  - Excluded pages: investigate the reason. Most common is "discovered, not
    crawled" — fix by ensuring the page is linked from home or another
    indexed page.

- [ ] **Review backlinks**
  - Search Console → **Links** report.
  - If a high-authority domain links to you, that's worth a thank-you DM
    (gives a small social-trust signal).

---

## Phase 5 — Custom domain (`rezaenayati.me`) follow-ups

The migration itself is done in code (`public/CNAME`, `astro.config.mjs`
`site`, `meta.ts` `SITE.url`, sitemap URL). After deploying + finishing DNS
setup, the items below are the SEO-specific follow-ups for a smooth
transition:

- [ ] **Verify site loads on `https://rezaenayati.me` with a green padlock**
  - "Enforce HTTPS" enabled in GitHub Pages → Custom domain.
  - `https://rezaenayati.github.io` should 301 to the apex (GitHub auto-creates
    this once the custom domain is set).

- [ ] **Add `https://rezaenayati.me` as a new property in Search Console**
  - Keep `rezaenayati.github.io` verified too for ~3 months so you can watch
    redirects work and old indexed URLs migrate over.
  - Resubmit `sitemap-index.xml` under the new property.

- [ ] **Update LinkedIn / GitHub / GitLab "Website" fields** to
  `https://rezaenayati.me` (apex, not www).

- [ ] **Anywhere else you've already shared the github.io URL** (CV, email
  signature, PDFs, social bios) — update to the apex. Old links still work
  via the 301 but the apex looks more polished.

---

## Tactics to explicitly skip

These are common SEO advice items that **don't help** for name-search SEO and
are sometimes harmful:

- ~~Buying backlinks.~~ Google penalizes; can hurt rankings.
- ~~Comment spam on blogs.~~ Same.
- ~~Self-authoring a Wikipedia entry.~~ Against notability rules; gets deleted.
- ~~Submitting to generic web directories.~~ No authority, can look spammy.
- ~~Stuffing pages with keywords.~~ Modern Google ignores or penalizes it.
- ~~Adding a Google Analytics tag in pursuit of "SEO data".~~ The brief
  excludes analytics by default; Search Console gives you everything you
  need for SEO purposes.

---

## What's already done (don't redo)

- ✅ `Person` JSON-LD on home with `sameAs` links to GitHub / LinkedIn / GitLab.
- ✅ `WebSite` JSON-LD on home.
- ✅ `TechArticle` JSON-LD on case-study pages.
- ✅ `Article` JSON-LD on article pages.
- ✅ `<title>` and H1 contain the exact name "Reza Enayati".
- ✅ URL contains the name (`rezaenayati.me`, with `rezaenayati.github.io`
  301-redirecting to it).
- ✅ Static HTML, mobile-friendly, fast load.
- ✅ Per-page OG images for case studies and articles.
- ✅ Sitemap at `/sitemap-index.xml`.
- ✅ Canonical URL on every page.
- ✅ `robots.txt` allowing all crawlers.
- ✅ RSS feed at `/rss.xml` (linked via `<link rel="alternate">`).
