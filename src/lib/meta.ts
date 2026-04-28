export const SITE = {
  name: "Reza Enayati",
  title: "Reza Enayati — Senior Backend Engineer · AI / LLM",
  description:
    "Senior backend engineer with 6+ years of production Node.js / TypeScript experience, focused on shipping LLM-powered features end-to-end.",
  // Canonical URL for SEO / OG tags. Keep this in sync with `site` in astro.config.mjs.
  url: "https://rezaenayati.me",
  ogImage: "/og-default.png",
  email: "enayatii.reza@gmail.com",
  github: "https://github.com/rezaenayati",
  gitlab: "https://gitlab.com/enayatii.reza",
  linkedin: "https://www.linkedin.com/in/reza-enayati/",
  locale: "en_US",
  twitterHandle: undefined as string | undefined,
} as const;

export type MetaInput = {
  title?: string;
  description?: string;
  ogImage?: string;
  pathname: string;
  type?: "website" | "article";
};

export type MetaOutput = {
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  ogType: "website" | "article";
};

export function buildMeta(input: MetaInput): MetaOutput {
  const title = input.title ? `${input.title} — ${SITE.name}` : SITE.title;
  const description = input.description ?? SITE.description;
  const canonical = new URL(input.pathname, SITE.url).toString();
  const ogImage = new URL(input.ogImage ?? SITE.ogImage, SITE.url).toString();
  return {
    title,
    description,
    canonical,
    ogImage,
    ogType: input.type ?? "website",
  };
}

// ---------- JSON-LD helpers ----------
// Output is plain objects; BaseLayout serializes them into a single
// <script type="application/ld+json"> block. Schema.org validators expect
// well-formed JSON, so do not include functions / undefined values.

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    url: SITE.url,
    email: `mailto:${SITE.email}`,
    jobTitle: "Senior Backend Engineer",
    description: SITE.description,
    worksFor: {
      "@type": "Organization",
      name: "Evolute GmbH",
      url: "https://evolute.app",
    },
    sameAs: [SITE.github, SITE.linkedin, SITE.gitlab],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    inLanguage: "en",
  };
}

export type ArticleSchemaInput = {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  updatedAt?: string;
  image?: string;
  /** Article (default) or TechArticle, BlogPosting, etc. */
  articleType?: "Article" | "TechArticle" | "BlogPosting";
};

export function articleSchema(input: ArticleSchemaInput) {
  const dateModified = input.updatedAt ?? input.publishedAt;
  const out: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": input.articleType ?? "Article",
    headline: input.title,
    description: input.description,
    url: input.url,
    datePublished: input.publishedAt,
    dateModified,
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: SITE.name,
      url: SITE.url,
    },
    publisher: {
      "@type": "Person",
      name: SITE.name,
      url: SITE.url,
    },
  };
  if (input.image) {
    out.image = input.image;
  }
  return out;
}
