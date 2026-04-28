import { defineCollection, z } from "astro:content";

const caseStudies = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    tags: z.array(z.string()),
    publishedAt: z.string(), // YYYY-MM-DD
    updatedAt: z.string().optional(),
    readingTime: z.string(), // e.g., "8 min"
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
