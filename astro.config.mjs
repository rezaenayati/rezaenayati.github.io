// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // Deployed to GitHub Pages on the custom domain https://rezaenayati.me.
  // The custom domain is wired via `public/CNAME` (copied to dist/CNAME on build)
  // plus the GitHub repo's Settings → Pages → Custom domain field.
  // The github.io URL stays valid and 301-redirects to the apex.
  site: "https://rezaenayati.me",
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
