"use client";

import { useEffect, useState } from "react";

/**
 * The clock where he is, so a visitor knows whether a message lands in the
 * morning or the middle of the night. It renders nothing until the client has
 * a value, which keeps the server and client markup identical.
 */
export function LocalTime({ template, locale }: { template: string; locale: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const read = () =>
      setTime(
        new Intl.DateTimeFormat(locale === "ar" ? "ar-SA-u-nu-latn" : "en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Riyadh",
        }).format(new Date()),
      );

    read();
    const timer = window.setInterval(read, 30_000);
    return () => window.clearInterval(timer);
  }, [locale]);

  if (!time) return null;
  return <>{template.replace("{time}", time)}</>;
}
