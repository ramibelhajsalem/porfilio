import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk, Dancing_Script } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Albert | Frontend Developer",
  description:
    "I am a frontend developer specializing in building beautiful, interactive web experiences.",
  keywords: [
    "Frontend Developer",
    "React",
    "Next.js",
    "Web Development",
    "UI/UX",
  ],
  authors: [{ name: "Albert" }],
  creator: "Albert",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Albert | Frontend Developer",
    description: "Frontend Developer Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${caveat.variable} ${dancingScript.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
