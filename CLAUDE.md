# CLAUDE.md

Guidance for working in this repository.

## Project

A single-page developer portfolio for **Moses Kwagga — Frontend Engineer & Cyber-Security Analyst**, rebuilt in **Next.js (App Router, TypeScript)** from a design handoff.

- `Portfolio.dc.html` — the original design-reference prototype (a `.dc.html` with an `<x-dc>`/`DCLogic` runtime wrapper). **Reference only — do not ship or edit.** Its inline styles are the source of truth for exact visual values; ignore the runtime wrapper.
- `README.md` — the original design handoff spec (tokens, copy, interactions, suggested structure).
- The aesthetic is **editorial, Swiss/grotesk**: near-white background (`#fafafa`), black ink, hairline rules, mono meta labels, big tight-tracked display type, generous whitespace. The palette is **white, black, and yellow** — yellow (`--color-accent` `#ffd400`) is the single accent. Use it sparingly and structurally (scroll-progress bar, hero availability dot, `::selection`, hover states on links/rows/tags, the "secure" highlight in Contact, Skills column rules). Don't introduce a *second* accent color without asking, and don't flood the page with yellow — it's punctuation, not body color.

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
- **Styling:** **Tailwind CSS v4** (utility classes inline in components). Design tokens live in the `@theme` block of `app/globals.css` and generate utilities (`bg-bg`, `text-ink`, `border-line`, `font-mono`, `animate-marquee`, …). No CSS Modules — use utilities; use arbitrary values (`text-[clamp(...)]`, `bg-[repeating-linear-gradient(...)]`) for one-off values, and `var(--color-*)` only inside SVG attributes/inline styles where a utility doesn't fit. Tailwind is wired via `@tailwindcss/postcss` (`postcss.config.mjs`); v4 auto-detects content (no `tailwind.config`).
- **Fonts:** This is a **typography-heavy** site — a serif/sans pairing, both loaded as **variable fonts** via `next/font/google`: **Fraunces** (`--font-fraunces`, serif display, with italics) for headings and **DM Sans** (`--font-dm-sans`, sans) for body. They're mapped in the `@theme` block to the built-in family utilities — `--font-serif` (→ `font-serif`) and `--font-sans` (→ `font-sans`, the `<body>` default). `--font-mono` is a system monospace stack (no downloaded font). Apply **`font-serif`** to headings/display type; body copy uses the default sans. (The former Archivo/Inter/Space Mono and the earlier `--font-heading` alias have been discarded — use `font-serif`.)
- **Smooth scroll:** Lenis (`components/SmoothScroll.tsx`).
- **Animation:** GSAP + `@gsap/react` (`useGSAP`).

## Structure

```
app/
  layout.tsx          // fonts, metadata, imports lenis css + globals, mounts <SmoothScroll/>
  page.tsx            // composes sections: Nav, Hero, Clients, Work, Skills, About, Contact
  globals.css         // @import tailwindcss, @theme tokens, base layer, keyframes, reduced-motion
components/
  Nav.tsx             // fixed top bar + mobile hamburger menu (client; toggle state)
  Hero.tsx            // centered name + circuit bg + GSAP entry reveal (client)
  CircuitBackground.tsx // two SVGs (pattern + SMIL electrons)
  Clients.tsx         // client-logo marquee under the hero
  Work.tsx            // project rows + cursor-following preview (client)
  ProjectPreview.tsx  // floating preview panel (presentational)
  Reveal.tsx          // IntersectionObserver scroll-reveal wrapper (client)
  Skills.tsx, About.tsx, Contact.tsx
  EmailLink.tsx       // client-assembled email (anti-obfuscation)
  SmoothScroll.tsx    // Lenis init + anchor handling (client)
hooks/
  useCursorPreview.ts // rAF lerp + hover show/hide; uses refs to avoid re-renders
lib/
  projects.ts         // typed project data, mapped into Work rows + preview
```

## Design tokens (in `@theme`, `app/globals.css`)

Defined as `--color-*` and surfaced as Tailwind utilities: `bg`/`ink` (`#fafafa`/`#0d0d0d`), `ink-soft`, `text-mute`, `meta`, `line`, `row-hover` (pure white `#ffffff` for hover pops against the off-white bg), plus placeholder/circuit/marquee colors, and the yellow accent trio `accent` (`#ffd400`), `accent-strong` (`#f2c200`, deeper for hover/contrast), `on-accent` (`#0d0d0d`, text on a yellow fill). Use the utilities (`bg-bg`, `text-ink`, `border-line`, `text-text-mute`, `bg-accent`, `text-on-accent`, …) — never raw hex. **Horizontal gutter** is now `px-5 sm:px-8` (20px under 640px, 32px at/above) rather than a `--gutter` variable.

## Conventions & decisions

- **Server vs client:** keep components server-side unless they need state/effects/interaction. Currently client: `Nav`, `Hero`, `Work`, `Reveal`, `EmailLink`, `SmoothScroll`.
- **Reduced motion:** every animation must respect `prefers-reduced-motion` (GSAP entry, Lenis, marquee, reveals, SMIL electrons). Use Tailwind's `motion-reduce:` variant (e.g. `motion-reduce:animate-none`) or guard the JS via `matchMedia`.
- **Scroll-reveal** uses `IntersectionObserver` (`Reveal`), not CSS `animation-timeline: view()` (cross-browser).
- **Hero entry animation:** masked "swipe-up" reveal — each line wrapped in an `overflow: hidden` mask; GSAP `from({ yPercent: 115 })` slides it up, staggered (eyebrow → MOSES/KWAGGA → role → availability). Rest state is visible by default so text is never hidden if JS/GSAP fails to load.
- **Anchor links** are smooth-scrolled via Lenis with a `-90px` offset to clear the fixed nav (matches `scroll-margin-top: 90px`).
- **Copy is final** — port hero name, subtitle, project text, and all copy verbatim from the spec.

## Responsiveness

**Responsive support is part of every change, not a follow-up.** When adding or editing any component or style, account for small screens in the same pass: check for x-axis overflow, add breakpoints where layout would break, and verify the change holds at mobile widths — not just desktop.

Guidelines:
- `html`/`body` clip horizontal overflow; always guard against x-axis overflow.
- Use **mobile-safe viewport units** (`svh`/`dvh`, not `vh`) for full-height sections so content isn't pushed below the fold by mobile browser UI. (Hero uses `min-h-svh` — **not** `100vh`: on iOS `100vh` resolves to the *large* viewport, which is taller than the visible screen and pushes `justify-center` content below the true center. Don't pair `vh` and `svh` `min-height`s either — the cascade won't reliably pick `svh`.)
- Key breakpoints in use: **720px** (nav → hamburger overlay, via `max-[720px]:`), **760px** (e.g. Work tags hidden), **640px** (tighter gutters `px-5`→`sm:px-8`, smaller type/padding via `max-[640px]:`). Tailwind's `sm` = 640px.
- **Nav:** desktop links hidden below 720px; hamburger opens a full-screen overlay menu.
- **Work rows:** body column has `min-width: 0`; tags hidden below 760px; tighter grid/padding under 640px.

## Placeholders to replace (not yet real)

- Project row `href`s and GitHub/LinkedIn/X links are `#contact` (see `lib/projects.ts`, `components/Contact.tsx`).
- Striped placeholders for the About portrait (4:5) and the 3 cursor-preview thumbnails.
- Email is `hello@moseskwagga.dev` (in `Contact.tsx` via `EmailLink`).
