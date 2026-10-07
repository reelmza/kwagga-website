# CLAUDE.md

Guidance for working in this repository.

## Project

A single-page developer portfolio for **Moses Kwagga — Full-stack Web Developer** (with a cyber-security background), built in **Next.js (App Router, TypeScript)**. It started from a design handoff but has since evolved past it.

- `Portfolio.dc.html` / `README.md` — the original design-reference prototype and handoff spec. **Historical reference only — do not ship or edit.** The live site has diverged (sections, fonts, accent color); the code is now the source of truth.
- The aesthetic is **editorial**: near-white background (`#fafafa`) with white / warm off-white section bands, black ink, hairline rules, mono meta labels, serif display headings, generous whitespace, and a fixed site-wide paper-grain overlay (in `app/layout.tsx`).
- The palette is **white, black, and dark orange** — orange (`--color-accent` `#fb5607`) is the single accent. Use it sparingly (hover states on links, `::selection`, the email underline in Contact). Don't introduce a *second* accent color without asking, and don't flood the page with orange — it's punctuation, not body color.

## Workflow preferences (important)

- **Do NOT start a dev server** (`npm run dev`) — the user keeps one running in a separate terminal and reviews changes there.
- **Do NOT run `npm run build`** after changes unless explicitly asked.
- Make the edits and stop; verify by reasoning/reading code, not by running the app.
- After installing a new dependency, remind the user to **restart their dev server** so the running process picks it up.
- **Responsive-first:** every change must include mobile/responsive support in the same pass — never ship desktop-only and wait to be asked. See the Responsiveness section below.

## Commands

- `npm run dev` — dev server (user runs this themselves).
- `npm run build` — production build (only when asked).
- `npm run lint` — Next.js lint.

## Tech stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript** (strict).
- **Styling:** **Tailwind CSS v4** (utility classes inline in components). Design tokens live in the `@theme inline` block of `app/globals.css` and generate utilities (`bg-bg`, `text-ink`, `border-line`, `font-mono`, `animate-marquee`, …). No CSS Modules — use utilities; use arbitrary values for one-off values, and `var(--color-*)` only inside SVG attributes/inline styles where a utility doesn't fit. Wired via `@tailwindcss/postcss`; v4 auto-detects content (no `tailwind.config`).
- **Fonts:** typography-heavy serif/sans pairing via `next/font/google`: **Playfair Display** (`--font-playfair-display` → `font-serif`) for headings/display type, **DM Sans** (`--font-dm-sans` → `font-sans`, the `<body>` default) for body. `--font-mono` is a system monospace stack.
- **Icons:** `lucide-react`.
- **Smooth scroll:** Lenis (`components/SmoothScroll.tsx`), synced to GSAP ScrollTrigger.
- **Animation:** GSAP + ScrollTrigger + `@gsap/react` (`useGSAP`).

## Structure

```
app/
  layout.tsx          // fonts, metadata (OG/Twitter), pre-paint gsap-loading script, <SmoothScroll/>, grain overlay
  page.tsx            // composes: Nav, Hero, About, WhyMe, Clients, Projects, Contact
  globals.css         // @import tailwindcss, @theme tokens, base layer, keyframes, reduced-motion
  opengraph-image.png / .alt.txt, twitter-image.png, favicon.ico  // file-based metadata
  cv/
    page.tsx          // /cv — shareable web CV (server) with "Download PDF" button
    download/route.ts // /cv/download — PDF via @react-pdf/renderer, force-static (built once)
    opengraph-image.tsx, twitter-image.tsx  // CV-specific share image (next/og)
components/
  Nav.tsx             // fixed headroom nav (hides on scroll down) + mobile hamburger overlay (client)
  Hero.tsx            // centered greeting; fades in on load, fades out on scroll (client)
  About.tsx           // #about — "What can I do for you?" + tool chips from lib/tools.ts (client)
  WhyMe.tsx           // #why — three numbered reasons (client)
  Clients.tsx         // #clients — grayscale logo grid; hover shows client info on desktop (client)
  Projects.tsx        // #projects — masonry cards + lightbox gallery (images/video) (client)
  Contact.tsx         // #contact — heading, EmailLink, socials, footer (server)
  EmailLink.tsx       // client-assembled email (anti-obfuscation)
  SmoothScroll.tsx    // Lenis init + anchor handling; clears the gsap-loading flag (client)
hooks/
  useFade.ts          // useFadeIn (load fade) + useScrollFade (scrubbed in/out fade)
lib/
  projects.ts         // typed project data (title, description, year, href, aspect, previewImage, lightBox[])
  clients.ts          // client name/type/location/logo
  tools.ts            // tools & stack chips (icons in public/images/tools)
  cv.ts               // CV content — single source for /cv page, PDF and OG image
  cv-pdf.tsx          // react-pdf A4 document (server-only)
  cv-og.tsx           // shared ImageResponse renderer for the CV OG/Twitter images
assets/fonts/         // static Playfair Display + DM Sans TTFs for react-pdf and next/og
                      // (they can't use next/font; woff2/variable fonts aren't supported)
public/images/        // assets/, clients/, featured-projects/, tools/
```

## Design tokens (in `@theme`, `app/globals.css`)

`bg`/`ink` (`#fafafa`/`#0d0d0d`), `ink-soft`, `text-mute`, `meta`, `faint`, `line`, `line-2`, `row-hover` (`#ffffff`), `section-alt` (`#f0efeb`, warm band used by Projects), placeholder colors, and the accent trio `accent` (`#fb5607`), `accent-strong` (`#e24400`, for hover/small text), `on-accent` (`#fafafa`, text on an accent fill). Use the utilities — **never raw hex** in components (add a token instead).

**Section layout:** sections share `p-8 lg:p-30 lg:px-40` (Contact uses the same horizontal gutters), a serif title (`font-serif text-3xl sm:text-4xl lg:text-5xl font-bold`) and a muted description (`text-base sm:text-lg lg:text-xl text-text-mute`). Follow this pattern for new sections.

## Conventions & decisions

- **Server vs client:** keep components server-side unless they need state/effects/interaction/GSAP. Currently server: `Contact`. Everything else animated is client.
- **Fades:** use `hooks/useFade.ts`. `useFadeIn` for above-the-fold/fixed elements (Hero text, Nav); `useScrollFade` for sections (scrubbed fade in on enter, out on leave). List children use a `gsap.from` stagger with a ScrollTrigger.
- **Anti-flash:** a blocking `<head>` script adds `html.gsap-loading`, which pre-hides `[data-fade]` elements until mount; `SmoothScroll` removes the flag. Use `fromTo` (not `from`) for anything marked `data-fade`. Skipped under reduced motion.
- **Reduced motion:** every animation must respect `prefers-reduced-motion` — wrap GSAP in `gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", …)`, use Tailwind's `motion-safe:`/`motion-reduce:` variants for CSS animations. Lenis is disabled under reduced motion.
- **Anchor links** are smooth-scrolled via Lenis with a `-90px` offset; sections carry `scroll-mt-22.5` (90px) for the native fallback. Every nav link must point at a real section `id`.
- **Overlays** (lightbox, mobile menu) lock body scroll, close on Escape, and use `data-lenis-prevent`. Fixed overlays must not live inside the transformed `<nav>`.
- **Projects:** a project with `lightBox` entries opens the gallery; otherwise its card links to `href`. Only `http(s)` hrefs get a "Visit Project" link. `index` values must be unique.

## CV (/cv)

- Edit content in `lib/cv.ts`; projects (by title) and clients are pulled from `lib/projects.ts` / `lib/clients.ts`.
- The PDF must stay **one A4 page** and is tightly packed — it shows only the first `PDF_PROJECTS` (4) projects. After adding content, re-check the page count; trim projects or spacing in `lib/cv-pdf.tsx` if it spills.
- PDF fonts only contain Latin glyphs — avoid symbols like arrows (↗) in PDF text.
- react-pdf/satori can't read CSS variables, so `cv-pdf.tsx` / `cv-og.tsx` mirror the color tokens as hex constants — keep them in sync with `globals.css`.

## Responsiveness

**Responsive support is part of every change, not a follow-up.** Check for x-axis overflow, add breakpoints where layout would break, and verify at mobile widths.

- `html`/`body` clip horizontal overflow; still guard against it.
- Use **mobile-safe viewport units** (`svh`/`dvh`, not `vh`) for full-height sections (sections use `min-h-svh`). Don't pair `vh` and `svh` `min-height`s.
- Breakpoints in use: **720px** (nav → wordmark + hamburger overlay, via `max-[720px]:`), Tailwind `sm` (640px), `lg` (1024px) for section padding, grid columns and type scale.
- **Nav:** desktop links hidden at ≤720px; hamburger opens a full-screen menu.
- **Clients:** hover info panel is desktop-only (`lg:`); grid is 2 → 3 → 5 columns.
- **Projects:** masonry columns 1 → 2 → 3.

## Contact details

- Email `jessemoses71@gmail.com` (split into user/domain for `EmailLink`).
- GitHub `github.com/reelmza`, LinkedIn `linkedin.com/in/moseskwagga`, X `x.com/moseskwagga`.
- Production URL in `metadataBase`: `https://kwagga.dev`.
