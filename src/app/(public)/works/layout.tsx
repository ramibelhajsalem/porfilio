import type { Metadata } from "next";
import { portfolio } from "@/content/portfolio";

export const metadata: Metadata = {
  title: `Works | ${portfolio.profile.identity.displayName}`,
  description: portfolio.pages.works.hero.description,
  alternates: {
    canonical: "/works",
  },
  openGraph: {
    title: `Works | ${portfolio.profile.identity.displayName}`,
    description: portfolio.pages.works.hero.description,
    url: "/works",
    images: portfolio.site.seo.ogImage ? [portfolio.site.seo.ogImage] : undefined,
  },
  twitter: {
    title: `Works | ${portfolio.profile.identity.displayName}`,
    description: portfolio.pages.works.hero.description,
    images: portfolio.site.seo.ogImage ? [portfolio.site.seo.ogImage] : undefined,
  },
};

export default function WorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
