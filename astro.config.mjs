// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // Deployed to GitHub Pages (user site) at https://rezaenayati.github.io.
  // For a user site (`<username>.github.io`), the path is `/`, so no `base` setting needed.
  // To swap to a custom domain later: change `site` and add `public/CNAME` containing the domain.
  site: "https://rezaenayati.github.io",
  trailingSlash: "ignore",
  redirects: {
    "/cv": "/cv.pdf",
  },
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      theme: "github-dark-dimmed",
      wrap: false,
    },
  },
  build: {
    inlineStylesheets: "auto",
  },
});
