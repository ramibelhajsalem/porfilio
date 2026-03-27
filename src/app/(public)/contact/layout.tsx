import type { Metadata } from "next";
import { portfolio } from "@/content/portfolio";

export const metadata: Metadata = {
  title: `Contact | ${portfolio.profile.identity.displayName}`,
  description: portfolio.pages.contact.description,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: `Contact | ${portfolio.profile.identity.displayName}`,
    description: portfolio.pages.contact.description,
    url: "/contact",
    images: portfolio.site.seo.ogImage ? [portfolio.site.seo.ogImage] : undefined,
  },
  twitter: {
    title: `Contact | ${portfolio.profile.identity.displayName}`,
    description: portfolio.pages.contact.description,
    images: portfolio.site.seo.ogImage ? [portfolio.site.seo.ogImage] : undefined,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
