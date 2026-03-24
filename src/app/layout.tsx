import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream-50 text-teal-800">
        {children}
      </body>
    </html>
  );
}
