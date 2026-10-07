import { cvOgAlt, cvOgSize, renderCvOg } from "@/lib/cv-og";

// CV-specific share image, overriding the site-wide one in app/.
export const alt = cvOgAlt;
export const size = cvOgSize;
export const contentType = "image/png";

export default function Image() {
  return renderCvOg();
}
