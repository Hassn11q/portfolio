import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name}, AI Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The share card carries the same type and palette as the page itself. */
export default async function OpengraphImage() {
  const fontsDir = join(process.cwd(), "src/assets/fonts");
  const [display, sans] = await Promise.all([
    readFile(join(fontsDir, "thmanyahserifdisplay-Medium.otf")),
    readFile(join(fontsDir, "thmanyahsans-Regular.otf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f4f4f2",
          color: "#101012",
          padding: "72px 80px",
          fontFamily: "Sans",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24 }}>
          <span>{profile.name}</span>
          <span style={{ color: "#6b6b71" }}>{profile.location}</span>
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: "Display",
            fontSize: 86,
            lineHeight: 1.04,
            letterSpacing: "-0.035em",
            maxWidth: 940,
          }}
        >
          {profile.hero.headline}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            borderTop: "1px solid #dedeba",
            paddingTop: 28,
            fontSize: 24,
            color: "#55555a",
          }}
        >
          <span style={{ display: "flex", width: 6, height: 28, background: "#bd3b12" }} />
          <span>{profile.role}</span>
          <span style={{ color: "#6b6b71" }}>|</span>
          <span>First place, KSAA-2026 Arabic speech diacritization</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Display", data: display, style: "normal", weight: 500 },
        { name: "Sans", data: sans, style: "normal", weight: 400 },
      ],
    },
  );
}
