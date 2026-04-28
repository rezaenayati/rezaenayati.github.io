// Combined RSS feed: case studies + articles, newest first.
// Lives at /rss.xml. Subscribers: anyone using a feed reader (Feedly,
// NetNewsWire, Reeder, etc.) plus aggregators like Hacker News' RSS bots.
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "~/lib/meta.ts";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const isProd = import.meta.env.PROD;

  const [caseStudies, articles] = await Promise.all([
    getCollection("case-studies", ({ data }) => (isProd ? !data.draft : true)),
    getCollection("articles", ({ data }) => (isProd ? !data.draft : true)),
  ]);

  const items = [
    ...caseStudies.map((entry) => ({
      title: entry.data.title,
      description: entry.data.summary,
      pubDate: new Date(entry.data.publishedAt),
      link: `/case-studies/${entry.slug}/`,
      categories: ["case study", ...entry.data.tags],
    })),
    ...articles.map((entry) => ({
      title: entry.data.title,
      description: entry.data.summary,
      pubDate: new Date(entry.data.publishedAt),
      link: `/articles/${entry.slug}/`,
      categories: ["writing", ...entry.data.tags],
    })),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: `${SITE.name} — Writing`,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items,
    customData: `<language>en</language>`,
  });
}
