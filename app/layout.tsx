import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

// Inline fractal-noise SVG → a fine grain that reads as paper / sand. Rendered
// once as a fixed full-page overlay so the texture covers the entire site.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.80' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// Serif display face for headings (with italics for editorial emphasis).
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
});

// Sans face for body copy.
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  // Base URL so file-based OG/Twitter images resolve to absolute URLs in prod.
  // Edit to your real domain.
  metadataBase: new URL("https://kwagga.vercel.app"),
  title: "Moses Kwagga - Full-stack Web Developer",
  description:
    "Building real-world solutions for bussiness and individuals with a focus on performance, accessibility, and user experience.",
  openGraph: {
    title: "Moses Kwagga - Full-stack Web Developer",
    description:
      "Building real-world solutions for bussiness and individuals with a focus on performance, accessibility, and user experience.",
    url: "https://kwagga.vercel.app",
    siteName: "Moses Kwagga",
    type: "website",
    // opengraph-image.png / opengraph-image.alt.txt in app/ are picked up
    // automatically — no need to list images here.
  },
  twitter: {
    card: "summary_large_image",
    title: "Moses Kwagga - Full-stack Web Developer",
    description:
      "Building real-world solutions for bussiness and individuals with a focus on performance, accessibility, and user experience.",
    // twitter-image.png in app/ is picked up automatically.
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${playfair.variable} font-sans`}>
        {/* Runs before first paint: flags the document so CSS can pre-hide the
            load-fade elements, preventing the SSR content from flashing visible
            before GSAP's entrance animation runs. Skipped under reduced motion
            (no fade there), and only ever hides content when JS is alive — if
            the script or JS fails, the flag is never set and everything shows. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(!matchMedia('(prefers-reduced-motion:reduce)').matches){document.documentElement.classList.add('gsap-loading')}}catch(e){}",
          }}
        />
        <SmoothScroll />
        {children}

        {/* Site-wide paper/sandy grain. Fixed so it covers the viewport on
            scroll; multiply textures light areas while leaving dark text intact. */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-50 opacity-[0.38] mix-blend-multiply"
          style={{ backgroundImage: GRAIN, backgroundSize: "200px 200px" }}
        />
      </body>
    </html>
  );
}
