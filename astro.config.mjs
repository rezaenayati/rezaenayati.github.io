// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
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
