import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Geist, Geist_Mono, Space_Grotesk, Dancing_Script } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ToastProvider } from "@/hooks/use-toast";
import { portfolio } from "@/content/portfolio";

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

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = portfolio.site;
  return {
    title: seo.title,
    description: seo.description,
    applicationName: portfolio.profile.identity.displayName,
    keywords: seo.keywords,
    authors: seo.author ? [{ name: seo.author }] : undefined,
    creator: seo.author || undefined,
    metadataBase: seo.url ? new URL(seo.url) : undefined,
    robots: seo.robots,
    alternates: {
      canonical: seo.url || undefined,
    },
    openGraph: {
      type: "website",
      locale: seo.locale,
      title: seo.title,
      description: seo.description,
      url: seo.url || undefined,
      images: seo.ogImage ? [{ url: seo.ogImage, alt: seo.title }] : undefined,
    },
    twitter: {
      card: seo.ogImage ? "summary_large_image" : "summary",
      title: seo.title,
      description: seo.description,
      creator: seo.twitterHandle || undefined,
      images: seo.ogImage ? [seo.ogImage] : undefined,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { seo, theme } = portfolio.site;
  const themeStyle = {
    "--color-teal-700": theme.primaryColor,
    "--color-lime": theme.accentColor,
    "--background": theme.backgroundColor,
    "--card": theme.surfaceColor,
    "--foreground": theme.foregroundColor,
    "--muted-foreground": theme.mutedColor,
  } as CSSProperties;

  return (
    <html
      lang={seo.locale.split("_")[0] || "en"}
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
