import { ogSize, renderSiteOg, siteOgAlt } from "@/lib/og";

// Site-wide share image (the CV overrides it in app/cv/).
export const alt = siteOgAlt;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderSiteOg();
}
