import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME, THEME_COLOR } from "@/lib/site";

// Served at /manifest.webmanifest and linked automatically. Icons live in
// public/ (full-bleed, glyph inside the maskable safe zone).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Full-stack Web Developer`,
    short_name: "Kwagga",
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: THEME_COLOR,
    theme_color: THEME_COLOR,
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
