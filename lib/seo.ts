import type { Metadata } from "next";
import { getSiteContent, type SeoEntry, type SeoKey } from "./site";

const routeText: Record<SeoKey, { title: string; description: string }> = {
  home: {
    title: "Shinro Manabi Academy",
    description: "Your trusted pathway to study in Japan.",
  },
  about: {
    title: "About Us",
    description: "Welcome to Shinro Manabi Academy.",
  },
  courses: {
    title: "Our Courses",
    description: "Japanese language and study in Japan courses.",
  },
  students: {
    title: "Students",
    description: "Search student information.",
  },
  result: {
    title: "Result",
    description: "Search your result.",
  },
  notice: {
    title: "Notice",
    description: "Latest notices and PDF downloads.",
  },
  contact: {
    title: "Contact",
    description: "Contact Shinro Manabi Academy.",
  },
};

function clean(value: string, fallback: string) {
  return value?.trim() || fallback;
}

function metadataFrom(entry: SeoEntry, key: SeoKey): Metadata {
  const fallback = routeText[key];
  const title = clean(entry.title, fallback.title);
  const description = clean(entry.description, fallback.description);
  const ogTitle = clean(entry.ogTitle, title);
  const ogDescription = clean(entry.ogDescription, description);
  const robots = clean(entry.robots, "index, follow").toLowerCase();

  return {
    title,
    description,
    keywords: entry.keywords
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    alternates: entry.canonical ? { canonical: entry.canonical } : undefined,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      images: entry.ogImage ? [{ url: entry.ogImage }] : undefined,
    },
    robots: {
      index: !robots.includes("noindex"),
      follow: !robots.includes("nofollow"),
    },
  };
}

export async function getSeoMetadata(key: SeoKey): Promise<Metadata> {
  const content = await getSiteContent();
  return metadataFrom(content.seo[key], key);
}
