import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { CvDocument } from "@/components/cv-document";
import { PrintButton } from "@/components/print-button";
import { content } from "@/data/content";

const c = content.en;

export const metadata: Metadata = {
  title: "CV",
  description: `Curriculum vitae for ${c.name}, ${c.role}.`,
  alternates: { canonical: "/cv", languages: { en: "/cv", ar: "/ar/cv" } },
};

export default function CvPage() {
  return (
    <>
      <div className="no-print shell flex flex-wrap items-center justify-between gap-4 py-8">
        <Link href="/" className="link inline-flex items-center gap-2 text-[0.9375rem]">
          <ArrowLeftIcon size={14} weight="bold" aria-hidden="true" className="rtl:-scale-x-100" />
          {c.name}
        </Link>
        <PrintButton label={c.ui.printCv} />
      </div>
      <CvDocument c={c} />
    </>
  );
}
