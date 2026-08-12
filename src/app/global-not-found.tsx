import type { Metadata } from "next";
import Link from "next/link";
import { Geist_Mono } from "next/font/google";
import { content } from "@/data/content";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const c = content.en;

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={geistMono.variable}>
      <body>
        <main className="flex min-h-[100dvh] items-center">
          <div className="shell">
            <p className="meta num">{c.ui.notFound.code}</p>
            <h1
              className="display-l mt-5 max-w-[18ch]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {c.ui.notFound.title}
            </h1>
            <p className="body mt-5">{c.ui.notFound.body}</p>
            <Link href="/" className="btn btn-primary mt-8">
              {c.ui.notFound.back}
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
