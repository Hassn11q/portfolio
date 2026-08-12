import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { DocumentShell } from "@/components/document-shell";
import { asset, content, siteUrl } from "@/data/content";
import "../globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const c = content.en;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${c.name} — AI Engineer`, template: `%s — ${c.name}` },
  description: c.metaDescription,
  keywords: [
    "Hassn Alqaeri",
    "AI Engineer",
    "Arabic NLP",
    "LLM",
    "RAG",
    "AI agents",
    "Arabic diacritization",
    "Riyadh",
    "Saudi Arabia",
  ],
  authors: [{ name: c.name, url: siteUrl }],
  creator: c.name,
  alternates: {
    canonical: "/",
    languages: { en: "/", ar: "/ar", "x-default": "/" },
  },
  openGraph: {
    type: "profile",
    url: siteUrl,
    title: `${c.name} — AI Engineer`,
    description: c.metaDescription,
    siteName: c.name,
    locale: "en_US",
    alternateLocale: "ar_SA",
  },
  twitter: {
    card: "summary_large_image",
    title: `${c.name} — AI Engineer`,
    description: c.metaDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: { icon: [{ url: asset("/icon.svg"), type: "image/svg+xml" }] },
};

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return (
    <DocumentShell locale="en" monoVariable={geistMono.variable}>
      {children}
    </DocumentShell>
  );
}
