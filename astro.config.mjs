// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

/** Remark plugin: transforms ```mermaid code blocks into <div class="mermaid"> before Shiki runs. */
function remarkMermaidDivs() {
  return function (/** @type {any} */ tree) {
    /** @param {any} node */
    function walk(node) {
      if (!node.children) return;
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        if (child.type === "code" && child.lang === "mermaid") {
          node.children[i] = {
            type: "html",
            value: `<div class="mermaid">${child.value}</div>`,
          };
        } else {
          walk(child);
        }
      }
    }
    walk(tree);
  };
}

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
  integrations: [mdx({ remarkPlugins: [remarkMermaidDivs] }), sitemap()],
  markdown: {
    shikiConfig: {
      theme: "github-dark-dimmed",
      wrap: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: "auto",
  },
});
