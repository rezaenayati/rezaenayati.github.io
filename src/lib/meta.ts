export const SITE = {
  name: "Reza Enayati",
  title: "Reza Enayati — Senior Backend Engineer · AI / LLM",
  description:
    "Senior backend engineer with 6+ years of production Node.js / TypeScript experience, focused on shipping LLM-powered features end-to-end.",
  // Canonical URL for SEO / OG tags. Keep this in sync with `site` in astro.config.mjs.
  url: "https://rezaenayati.github.io",
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
