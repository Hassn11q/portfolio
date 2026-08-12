"use client";

import { PrinterIcon } from "@phosphor-icons/react/dist/csr/Printer";

/** Opens the browser print dialogue, which is also how the page is saved as PDF. */
export function PrintButton({ label }: { label: string }) {
  return (
    <button type="button" onClick={() => window.print()} className="btn btn-primary">
      <PrinterIcon size={16} weight="light" aria-hidden="true" />
      {label}
    </button>
  );
}
