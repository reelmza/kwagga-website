import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { cv } from "@/lib/cv";
import { clients } from "@/lib/clients";

// Shared by app/cv/opengraph-image.tsx and app/cv/twitter-image.tsx.

export const cvOgAlt = `${cv.name} — Curriculum Vitae · ${cv.role}`;
export const cvOgSize = { width: 1200, height: 630 };

// Mirrors the @theme tokens in app/globals.css (satori can't read CSS vars).
const INK = "#0d0d0d";
const BG = "#fafafa";
const ACCENT = "#fb5607";

const font = (file: string) => readFile(join(process.cwd(), "assets/fonts", file));

export async function renderCvOg() {
  const [playfair, playfairItalic, dmSans, dmSansMedium] = await Promise.all([
    font("PlayfairDisplay-Bold.ttf"),
    font("PlayfairDisplay-BoldItalic.ttf"),
    font("DMSans-Regular.ttf"),
    font("DMSans-Medium.ttf"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          backgroundColor: INK,
          // Faint editorial grid.
          backgroundImage:
            "linear-gradient(rgba(250,250,250,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(250,250,250,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          color: BG,
          fontFamily: "DM Sans",
        }}
      >
        {/* Oversized "CV" bleeding off the right edge. */}
        <div
          style={{
            position: "absolute",
            right: -30,
            bottom: -150,
            fontFamily: "Playfair",
            fontStyle: "italic",
            fontSize: 560,
            lineHeight: 1,
            letterSpacing: -20,
            color: ACCENT,
          }}
        >
          CV
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 72px",
            width: "100%",
          }}
        >
          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: ACCENT }} />
            <div
              style={{
                fontSize: 22,
                fontWeight: 500,
                letterSpacing: 5,
                textTransform: "uppercase",
                color: "#bdbdbd",
              }}
            >
              Curriculum Vitae
            </div>
          </div>

          {/* Name + role */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontFamily: "Playfair",
                fontSize: 104,
                lineHeight: 0.95,
                letterSpacing: -3,
              }}
            >
              Moses
            </div>
            <div
              style={{
                fontFamily: "Playfair",
                fontSize: 104,
                lineHeight: 0.95,
                letterSpacing: -3,
              }}
            >
              Kwágga
            </div>
            <div style={{ marginTop: 22, fontSize: 34, color: "#e6e6e6" }}>
              {cv.role}
            </div>
            <div style={{ marginTop: 10, fontSize: 24, color: "#999999" }}>
              {`7 years · Security-first · ${clients.length}+ clients`}
            </div>
          </div>

          {/* Footer */}
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ fontSize: 24, fontWeight: 500 }}>kwagga.dev/cv</div>
            <div
              style={{
                display: "flex",
                fontSize: 20,
                padding: "8px 18px",
                borderRadius: 999,
                border: "1.5px solid rgba(250,250,250,0.35)",
                color: "#e6e6e6",
              }}
            >
              View · Download PDF
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...cvOgSize,
      fonts: [
        { name: "Playfair", data: playfair, weight: 700, style: "normal" },
        { name: "Playfair", data: playfairItalic, weight: 700, style: "italic" },
        { name: "DM Sans", data: dmSans, weight: 400, style: "normal" },
        { name: "DM Sans", data: dmSansMedium, weight: 500, style: "normal" },
      ],
    },
  );
}
