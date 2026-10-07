import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { clients } from "@/lib/clients";

// Shared share-image design (light, editorial grid, oversized orange italic
// glyph). Used by the site-wide image in app/ and the CV image in app/cv/.

export const ogSize = { width: 1200, height: 630 };

// Mirrors the @theme tokens in app/globals.css (satori can't read CSS vars).
const INK = "#0d0d0d";
const INK_SOFT = "#262626";
const MUTE = "#6b6b6b";
const BG = "#fafafa";
const ACCENT = "#fb5607";

const font = (file: string) => readFile(join(process.cwd(), "assets/fonts", file));

type OgOptions = {
  /** Small uppercase label above the name. */
  eyebrow: string;
  /** Large orange italic glyph bleeding off the right edge. */
  glyph: string;
  /** Position/size tweaks for the glyph (different letters need different fits). */
  glyphStyle?: { fontSize?: number; right?: number; bottom?: number };
  role: string;
  tagline: string;
  url: string;
};

export async function renderOg({
  eyebrow,
  glyph,
  glyphStyle,
  role,
  tagline,
  url,
}: OgOptions) {
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
          backgroundColor: BG,
          // Faint editorial grid.
          backgroundImage:
            "linear-gradient(rgba(13,13,13,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(13,13,13,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          color: INK,
          fontFamily: "DM Sans",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: glyphStyle?.right ?? -30,
            bottom: glyphStyle?.bottom ?? -150,
            fontFamily: "Playfair",
            fontStyle: "italic",
            fontSize: glyphStyle?.fontSize ?? 560,
            lineHeight: 1,
            letterSpacing: -20,
            color: ACCENT,
          }}
        >
          {glyph}
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
                color: MUTE,
              }}
            >
              {eyebrow}
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
            <div style={{ marginTop: 22, fontSize: 34, color: INK_SOFT }}>
              {role}
            </div>
            <div style={{ marginTop: 10, fontSize: 24, color: MUTE }}>
              {tagline}
            </div>
          </div>

          {/* Footer */}
          <div style={{ display: "flex", fontSize: 24, fontWeight: 500 }}>
            {url}
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Playfair", data: playfair, weight: 700, style: "normal" },
        { name: "Playfair", data: playfairItalic, weight: 700, style: "italic" },
        { name: "DM Sans", data: dmSans, weight: 400, style: "normal" },
        { name: "DM Sans", data: dmSansMedium, weight: 500, style: "normal" },
      ],
    },
  );
}

// ── Presets ────────────────────────────────────────────────────────────────

const ROLE = "Full-stack Web Developer";
const CLIENTS = `${clients.length}+ clients`;

export const siteOgAlt = `Moses Kwagga — ${ROLE}`;
export const renderSiteOg = () =>
  renderOg({
    eyebrow: "Portfolio",
    glyph: "K",
    glyphStyle: { fontSize: 720, right: 10, bottom: -210 },
    role: ROLE,
    tagline: `Web & mobile · Security-first · ${CLIENTS}`,
    url: "kwagga.dev",
  });

export const cvOgAlt = `Moses Kwagga — Curriculum Vitae · ${ROLE}`;
export const renderCvOg = () =>
  renderOg({
    eyebrow: "Curriculum Vitae",
    glyph: "CV",
    role: ROLE,
    tagline: `7 years · Security-first · ${CLIENTS}`,
    url: "kwagga.dev/cv",
  });
