import type { Metadata } from "next";
import { portfolio } from "@/content/portfolio";

export const metadata: Metadata = {
  title: `About | ${portfolio.profile.identity.displayName}`,
  description: portfolio.profile.summary.long,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `About | ${portfolio.profile.identity.displayName}`,
    description: portfolio.profile.summary.long,
    url: "/about",
    images: portfolio.site.seo.ogImage
      ? [portfolio.site.seo.ogImage]
      : undefined,
  },
  twitter: {
    title: `About | ${portfolio.profile.identity.displayName}`,
    description: portfolio.profile.summary.long,
    images: portfolio.site.seo.ogImage
      ? [portfolio.site.seo.ogImage]
      : undefined,
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
