import { cvOgAlt, ogSize, renderCvOg } from "@/lib/og";

// CV-specific share image, overriding the site-wide one in app/.
export const alt = cvOgAlt;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderCvOg();
}
