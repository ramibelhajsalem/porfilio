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
  const { site } = portfolio;
  return {
    title: site.title,
    description: site.description,
    keywords: site.keywords,
    authors: site.author ? [{ name: site.author }] : undefined,
    creator: site.author || undefined,
    metadataBase: site.url ? new URL(site.url) : undefined,
    robots: site.robots,
    openGraph: {
      type: "website",
      locale: site.locale,
      title: site.title,
      description: site.description,
      url: site.url || undefined,
      images: site.ogImage ? [{ url: site.ogImage, alt: site.title }] : undefined,
    },
    twitter: {
      card: site.ogImage ? "summary_large_image" : "summary",
      title: site.title,
      description: site.description,
      creator: site.twitterHandle || undefined,
      images: site.ogImage ? [site.ogImage] : undefined,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme } = portfolio;
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
