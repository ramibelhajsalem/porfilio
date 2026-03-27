import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Geist, Geist_Mono, Space_Grotesk, Dancing_Script } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ToastProvider } from "@/hooks/use-toast";
import { getSiteConfigMap } from "@/lib/supabase/queries";
import { getSiteConfigValue, parseJsonSiteConfig } from "@/lib/site-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveat = localFont({
  src: "../../public/fonts/Caveat,Poppins,Roboto/Caveat/Caveat-VariableFont_wght.ttf",
  variable: "--font-caveat",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: ["700"],
});

async function getLayoutConfig() {
  return getSiteConfigMap([
    "site_title",
    "site_description",
    "site_author",
    "site_keywords",
    "site_url",
    "og_image_url",
    "site_locale",
    "site_robots",
    "twitter_handle",
    "theme_primary_color",
    "theme_accent_color",
    "theme_background_color",
    "theme_surface_color",
    "theme_foreground_color",
    "theme_muted_color",
  ]);
}

export async function generateMetadata(): Promise<Metadata> {
  const config = await getLayoutConfig();
  const title = getSiteConfigValue(config, "site_title");
  const description = getSiteConfigValue(config, "site_description");
  const author = getSiteConfigValue(config, "site_author");
  const siteUrl = getSiteConfigValue(config, "site_url");
  const ogImage = getSiteConfigValue(config, "og_image_url");
  const locale = getSiteConfigValue(config, "site_locale") || "en_US";
  const robots = getSiteConfigValue(config, "site_robots") || "index, follow";
  const twitterHandle = getSiteConfigValue(config, "twitter_handle");
  const keywords = parseJsonSiteConfig<string[]>(
    config.site_keywords,
    ["Frontend Developer", "React", "Next.js", "Portfolio"]
  );

  return {
    title,
    description,
    keywords,
    authors: author ? [{ name: author }] : undefined,
    creator: author || undefined,
    metadataBase: siteUrl ? new URL(siteUrl) : undefined,
    robots,
    openGraph: {
      type: "website",
      locale,
      title,
      description,
      url: siteUrl || undefined,
      images: ogImage ? [{ url: ogImage, alt: title }] : undefined,
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title,
      description,
      creator: twitterHandle || undefined,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await getLayoutConfig();
  const themeStyle = {
    "--color-teal-700": getSiteConfigValue(config, "theme_primary_color"),
    "--color-lime": getSiteConfigValue(config, "theme_accent_color"),
    "--background": getSiteConfigValue(config, "theme_background_color"),
    "--card": getSiteConfigValue(config, "theme_surface_color"),
    "--foreground": getSiteConfigValue(config, "theme_foreground_color"),
    "--muted-foreground": getSiteConfigValue(config, "theme_muted_color"),
  } as CSSProperties;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${caveat.variable} ${dancingScript.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col" style={themeStyle}>
        <ToastProvider>
          {children}
          <Toaster />
        </ToastProvider>
      </body>
    </html>
  );
}
