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

const c = content.ar;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${c.name} — مهندس ذكاء اصطناعي`, template: `%s — ${c.name}` },
  description: c.metaDescription,
  keywords: [
    "حسن القعيري",
    "مهندس ذكاء اصطناعي",
    "معالجة اللغة العربية",
    "النماذج اللغوية",
    "الاسترجاع المعزز",
    "وكلاء الذكاء الاصطناعي",
    "تشكيل النص العربي",
    "الرياض",
  ],
  authors: [{ name: c.name, url: `${siteUrl}/ar` }],
  creator: c.name,
  alternates: {
    canonical: "/ar",
    languages: { en: "/", ar: "/ar", "x-default": "/" },
  },
  openGraph: {
    type: "profile",
    url: `${siteUrl}/ar`,
    title: `${c.name} — مهندس ذكاء اصطناعي`,
    description: c.metaDescription,
    siteName: c.name,
    locale: "ar_SA",
    alternateLocale: "en_US",
    // Rendered in a browser rather than at request time: Arabic needs proper
    // shaping, which the runtime image generator does not do.
    images: [{ url: asset("/media/og-ar.png"), width: 1200, height: 630, alt: c.hero.headline }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${c.name} — مهندس ذكاء اصطناعي`,
    description: c.metaDescription,
    images: [asset("/media/og-ar.png")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: { icon: [{ url: asset("/icon.svg"), type: "image/svg+xml" }] },
};

export default function ArabicLayout({ children }: { children: React.ReactNode }) {
  return (
    <DocumentShell locale="ar" monoVariable={geistMono.variable}>
      {children}
    </DocumentShell>
  );
}
