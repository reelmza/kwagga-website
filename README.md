# Handoff: Moses Kwagga — Developer Portfolio

## Overview
A single-page, minimal-bright, monochrome developer portfolio for **Moses Kwagga — Frontend Engineer & Cyber-Security Analyst**. It presents a centered "geometric" hero over an animated circuit-board background, followed by Selected Work, Stack & Capabilities, About, and a Contact/footer. The aesthetic is editorial and restrained (Swiss/grotesk type, hairline rules, generous whitespace, monospace meta labels) with subtle, tasteful motion.

## About the Design Files
The file in this bundle (`Portfolio.dc.html`) is a **design reference created in HTML** — a working prototype that shows the intended look, layout, typography, and interactions. **It is not production code to copy directly.** The `.dc.html` format wraps the markup in a lightweight custom runtime (a `<x-dc>`/`DCLogic` harness); ignore that wrapper. What matters is the visual design and behavior.

**Your task:** recreate this design in **Next.js** using the project's own conventions — the App Router, React components, and whatever styling solution you prefer (the design maps cleanly onto Tailwind, CSS Modules, or vanilla CSS). All styling in the prototype is inline; treat those inline styles as the source of truth for exact values, but reorganize them into idiomatic components and reusable tokens. The interactive bits (cursor-following preview, scroll progress, live clock, runtime-assembled email) are currently hand-wired in a logic class — reimplement them as React hooks/effects.

## Fidelity
**High-fidelity (hifi).** Colors, typography, spacing, and interactions are final. Recreate the UI pixel-accurately, then refactor into clean components. Exact values are listed under **Design Tokens** below.

---

## Tech mapping (suggested Next.js structure)
```
app/
  layout.tsx          // import fonts (Archivo, Space Mono), global reset, <Nav/> + <Footer/>
  page.tsx            // composes the sections
components/
  Nav.tsx             // fixed top bar + live clock
  ScrollProgress.tsx  // fixed 2px top progress bar
  Hero.tsx            // centered name + circuit SVG background
  CircuitBackground.tsx // the two SVGs (pattern + animated electrons)
  Work.tsx            // 3 project rows
  ProjectPreview.tsx  // cursor-following floating preview
  Skills.tsx
  About.tsx
  Contact.tsx         // email assembled client-side, marquee, colophon
hooks/
  useLiveClock.ts     // WAT time, updates every 1s
  useScrollProgress.ts
  useCursorPreview.ts // rAF lerp + show/hide on row hover
```
Load fonts with `next/font/google`: **Archivo** (weights 400,500,600,700,800,900) and **Space Mono** (400,700).

---

## Design Tokens

### Colors (monochrome, warm-neutral)
| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#f5f4f1` | page background (warm off-white) |
| `--ink` | `#0d0d0d` | primary text, dots, marquee on hover |
| `--ink-soft` | `#2a2a28` | hero subtitle |
| `--text-mute` | `#76756f` | project descriptions |
| `--meta` | `#9a9a95` | mono meta labels, index numbers |
| `--faint` | `#bdbcb6` / `#b6b5af` | slashes, electron dots |
| `--line` | `#e0dfdb` | section divider hairlines |
| `--line-2` | `#e6e5e1` | misc light rules |
| `--row-hover` | `#fbfbf9` | project row hover background |
| `--placeholder-a` | `#e7e6e2` | striped placeholder stripe 1 |
| `--placeholder-b` | `#efeeea` | striped placeholder stripe 2 |
| Circuit trace stroke | `#ecebe6` (pattern), `#dcdbd5` (electron wires) |
| Circuit via nodes | `#e4e3dd` |

### Typography
- **Display / body:** `Archivo`, sans-serif
- **Meta / labels / numbers:** `Space Mono`, monospace
- Hero name `MOSES KWAGGA`: weight **900**, `font-size: clamp(48px, 11vw, 180px)`, `line-height: 0.84`, `letter-spacing: -0.045em`, uppercase, centered.
- Section headings (e.g. "Stack & capabilities", "Let's build…"): weight **700**, `clamp(30px, 4.4vw, 64px)` → contact uses `clamp(36px, 7vw, 110px)`, `letter-spacing: -0.03em` to `-0.04em`, `line-height: 0.94`.
- Project titles: weight **700**, `clamp(28px, 4.6vw, 62px)`, `line-height: 0.98`, `letter-spacing: -0.03em`.
- Body/subtitles: 15–22px, weight 500.
- Mono labels: 10–13px, `letter-spacing: 1–3px`, often `text-transform: uppercase`, color `--meta`.

### Spacing & layout
- Global horizontal padding: **32px**.
- Section vertical padding: **96px** top/bottom (Work uses 40px top / 30px bottom because rows carry their own padding).
- Section dividers: `border-top: 1px solid #e0dfdb`.
- `scroll-margin-top: 90px` on anchored sections (`#work`, `#skills`, `#about`, `#contact`) to offset the fixed nav.
- Max content width: none on most sections (full-bleed with 32px gutters); they read full width intentionally.

### Radius / shapes
- No rounded corners anywhere except circles (status dots, electron dots, via nodes — all `border-radius: 50%`).
- Status/availability dot: `7px` black circle.

---

## Screens / Views
Single scrolling page. Sections top → bottom:

### 1. Nav (fixed, z-index 100)
- Full width, `padding: 20px 32px`, `display:flex; justify-content:space-between; align-items:center`.
- **Left:** "Moses Kwagga" (weight 800, 15px, `letter-spacing:-0.3px`) + a mono "©26" (11px, `#9a9a95`), baseline-aligned, links to `#top`.
- **Right:** flex row, `gap:28px` — anchor links **Work / Skills / About / Contact** (13px, weight 500, hover `opacity:0.55`) + a **live clock** (mono 11px, `#9a9a95`, `min-width:96px; text-align:right`).
- Nav sits over content (no background); keep it readable on the bright bg.

### 2. Scroll progress (fixed top, z-index 200)
- 2px tall full-width track (transparent) with an inner bar `background:#0d0d0d`, width = scroll percentage.

### 3. Hero (`min-height:100vh`, centered, `text-align:center`, z-index content above background)
- **Circuit background** (two stacked SVGs, `position:absolute; inset:0; pointer-events:none`):
  - **SVG 1 — pattern:** a `<pattern id="circuit-pattern">` tile (180×180, `patternUnits=userSpaceOnUse`) of right-angle **traces** (`stroke:#ecebe6; stroke-width:1.1`) plus **via nodes** (`fill:#e4e3dd; r:2.6`). Tile paths (in the prototype):
    - `M0 46 H56 V12`, `M90 0 V64 H180`, `M24 180 V134 H82 V96`, `M134 180 V120 H180`, `M180 100 H128 V72`, `M0 124 H40 V168`, `M56 46 H110`, `M90 64 V108`
    - Nodes at: (56,46) (90,64) (82,96) (128,72) (40,124) (110,46)
    - Filled `<rect>` uses `fill:url(#circuit-pattern)`.
  - **SVG 2 — electrons:** `viewBox="0 0 1440 900"`, `preserveAspectRatio="xMidYMid slice"`. Two visible accent wires:
    - `#trace-a`: `M-40 150 H110 V330 H240 V560` (left side)
    - `#trace-b`: `M1480 740 H1330 V500 H1200 V280` (right side)
    - stroke `#dcdbd5`, `stroke-width:1.4`, `stroke-linejoin:round`.
    - Two **electrons**: each a `<g>` with a faint glow circle (`r:7; fill:#0d0d0d; opacity:0.04`) + core dot (`r:2.2; fill:#b6b5af`), animated along its trace via `<animateMotion>` `<mpath>`. Durations **17s** (trace-a) and **21s** (trace-b, `begin:-6s`), `repeatCount:indefinite`, `rotate:auto`.
  - **Both SVGs** are masked so the pattern fades out behind the name:
    `mask-image: radial-gradient(ellipse 62% 56% at 50% 50%, transparent 0%, transparent 30%, #000 82%);` (include `-webkit-mask-image` too). Pattern SVG uses a slightly tighter ellipse (`58–62%`) — match the file.
  - **In React:** SMIL `<animateMotion>` works in modern browsers, but for SSR-safety/control consider Framer Motion's `offsetPath`/`pathOffset` or a small rAF loop. SMIL is acceptable and simplest.
- **Hero content** (relative, above background):
  - Mono eyebrow: `PORTFOLIO — 2026` (12px, `letter-spacing:3px`, uppercase, `#9a9a95`, margin-bottom 26px).
  - `<h1>` `MOSES`<br>`KWAGGA` — see type spec above.
  - Subtitle: `Frontend Engineer · Cyber-Security Analyst` (`clamp(15px,1.7vw,20px)`, weight 500, `#2a2a28`, margin-top 30px).
  - Availability row: 7px black dot + "Available for work" (mono 12px), margin-top 26px.

### 4. Selected Work (`#work`)
- Header row: mono "Selected Work" label (left) + mono "(03)" (right), with scroll-reveal animation.
- **3 project rows**, each an `<a href="#contact">` (replace with real project URLs), CSS grid `grid-template-columns: 56px 1fr auto; gap:24px; align-items:center; padding:34px 0`, `border-top:1px solid #e0dfdb` (last row also `border-bottom`).
  - Col 1: mono index `01`/`02`/`03` (`#9a9a95`).
  - Col 2: project **title** (big) + **description** (14px, `#76756f`).
  - Col 3: mono tags + mono year + a `↗` arrow (20px).
  - **Hover:** `padding-left: 28px; background:#fbfbf9` with `transition: padding-left .5s cubic-bezier(.2,.85,.25,1), background .4s ease`. On hover the cursor-following preview appears (see Interactions).
- Project content (exact copy):
  1. **Timeless Di-zin** — "Brand & portfolio site — design direction, build, motion" — tags `Design · Frontend` — `2025`
  2. **OayasTech CBT** — "Computer-based testing platform serving Nigerian universities" — tags `React · Security` — `2024`
  3. **Client Portfolios** — "Personal & business sites — selected freelance engagements" — tags `Frontend` — `2023—26`

### 5. Stack & Capabilities (`#skills`)
- Header: big `<h2>` "Stack & capabilities" + mono "(04)".
- 3-column grid `repeat(auto-fit, minmax(220px, 1fr)); gap:48px`. Each column: mono uppercase heading with `border-bottom:1px solid #e0dfdb; padding-bottom:14px`, then a vertical list (`gap:18px`, 17px weight 500).
  - **Engineering:** React & Next.js · TypeScript · Tailwind / CSS Architecture · Node.js · Web Performance · Accessibility
  - **Security:** Threat Modeling · OWASP Top 10 · Auth & Identity · Secure SDLC · Vulnerability Assessment · Network Analysis
  - **Toolkit:** Figma · Git & GitHub · Linux · Vite · Burp / Wireshark · Postman

### 6. About (`#about`)
- 2-column grid `1.5fr 1fr; gap:64px; align-items:start`.
- Left: mono "About" label, then a large statement paragraph (`clamp(22px,2.6vw,38px)`, weight 500, `line-height:1.28`, `text-wrap:pretty`):
  > "I'm Moses — a frontend engineer who treats security as part of the craft, not an afterthought. I build interfaces that feel effortless and hold up under pressure, from brand portfolios to testing platforms used across Nigerian universities."
  - Stats row (`gap:56px`): **5+** Years building · **20+** Projects shipped · **∞** Coffees debugged (numbers `clamp(34px,4vw,54px)` weight 700; mono caption `#9a9a95`).
- Right: a **striped placeholder** (`aspect-ratio:4/5`) labelled `[ portrait ]` — replace with a real portrait image.

### 7. Contact / Footer (`#contact`)
- Mono "Contact" label.
- Big `<h2>` "Let's build something<br>secure together." (`clamp(36px,7vw,110px)`, weight 700, `line-height:0.94`, `letter-spacing:-0.04em`).
- **Email link:** displays/links `hello@moseskwagga.dev` (underlined, `clamp(20px,2.6vw,34px)`, weight 600, `border-bottom:2px solid #0d0d0d`, hover `opacity:0.55`). **Assembled client-side** to dodge email-obfuscation scripts (see Interactions). Replace with the real address.
- Social links row (`gap:28px`): GitHub ↗ · LinkedIn ↗ · X ↗ (14px, `#76756f`, hover → `#0d0d0d`). Replace `#contact` placeholders with real URLs.
- **Marquee:** an overflow-hidden strip, inner flex `width:max-content` with the text duplicated twice, `animation: marquee 26s linear infinite` (`@keyframes marquee { from { transform:translateX(0) } to { transform:translateX(-50%) } }`). Text: "SELECTED WORK 2023—2026 · AVAILABLE FOR NEW PROJECTS · ", `clamp(40px,7vw,96px)`, weight 800, color `#e2e1dc` (very faint).
- Colophon row (`border-top:1px solid #e0dfdb; padding:26px 0`): "Designed & built by Moses Kwagga — © 2026" (left) and "Frontend · Security · Lagos, WAT" (right), mono 12px `#9a9a95`.

---

## Interactions & Behavior

1. **Live clock (WAT):** updates every 1s. `new Date().toLocaleTimeString('en-GB', { timeZone: 'Africa/Lagos', hour:'2-digit', minute:'2-digit', second:'2-digit' }) + ' WAT'`. In Next.js, render client-side only (`'use client'` + `useEffect`) to avoid hydration mismatch; render a placeholder `—:—:— WAT` on the server.

2. **Scroll progress bar:** on window scroll, `width = scrollTop / (scrollHeight - clientHeight) * 100%`. Passive scroll listener.

3. **Cursor-following project preview:** a `position:fixed` panel (340×430px, `pointer-events:none`, z-index ~90, `opacity` transitions `.45s`). Contains 3 stacked striped placeholders (one per project) labelled `[ timeless di-zin ]`, `[ oayastech cbt ]`, `[ client work ]`.
   - A rAF loop **lerps** the panel toward the cursor: `c.x += (target.x - c.x) * 0.14` (same for y), `transform: translate(cx, cy) translate(-50%,-50%)`.
   - On project row `mouseenter`: show the matching placeholder (`opacity:1`, others `0`) and set panel `opacity:1` **only if `window.innerWidth > 900`** (desktop only).
   - On `mouseleave`: panel `opacity:0`.
   - Replace placeholders with real project thumbnails (recommend 4:5 or similar; the panel is portrait-ish 340×430).

4. **Scroll-reveal:** section headers/blocks rise + fade in on enter using CSS scroll-driven animations:
   `animation-name: rise; animation-fill-mode: both; animation-timeline: view(); animation-range: entry X% cover Y%;`
   `@keyframes rise { from { opacity:0; transform:translateY(34px) } to { opacity:1; transform:none } }`.
   - `animation-timeline: view()` is Chromium-only today. For cross-browser Next.js, use **IntersectionObserver** (or Framer Motion `whileInView`) to add the reveal instead.

5. **Runtime-assembled email:** the address is stored split (`data-email="hello|moseskwagga.dev"`) and reassembled in JS at mount (`parts[0] + String.fromCharCode(64) + parts[1]`) to set both the visible text and the `mailto:` href. This defeats automatic email-obfuscation that otherwise rewrites literal `name@domain` mailto links into "[email protected]". **Keep this pattern** if your host runs similar obfuscation; otherwise a normal `<a href="mailto:…">` is fine.

6. **Hover states:** nav links `opacity:0.55`; project rows `padding-left:28px` + `background:#fbfbf9`; email `opacity:0.55`; social links color → `#0d0d0d`. All use smooth transitions.

7. **Reduced motion:** `@media (prefers-reduced-motion: reduce)` disables smooth scroll. Extend this to also pause/disable the electrons, marquee, and reveals for accessibility.

---

## State Management
Minimal — all local/UI state, no data fetching required:
- `clock` string (interval, client-only).
- `scrollProgress` number (scroll listener).
- Cursor-preview position + active index + visibility (rAF + hover; keep in refs, not state, to avoid re-renders).
- Project data is static — model it as a typed array and `.map()` the Work rows and preview placeholders from it.

---

## Assets
- **No real images** in the prototype. Two striped placeholders need real assets:
  - About **portrait** (`[ portrait ]`, 4:5).
  - Three **project thumbnails** for the cursor preview (`[ timeless di-zin ]`, `[ oayastech cbt ]`, `[ client work ]`).
  - Striped placeholder recipe: `background-image: repeating-linear-gradient(45deg, #e7e6e2 0 11px, #efeeea 11px 22px)` with a centered mono caption — reuse for any not-yet-supplied image.
- **Fonts:** Archivo + Space Mono (Google Fonts) — load via `next/font/google`.
- **Icons:** none (uses the `↗` glyph). Add an icon set only if you extend the design.

## Files
- `Portfolio.dc.html` — the full design reference (open in a browser to see it live; ignore the `<x-dc>` runtime wrapper and the `class Component extends DCLogic` block — they're the prototype harness, not part of the design).

## Notes for the rebuild
- Keep it **monochrome** — the design intentionally uses no accent color. Don't introduce one without asking.
- Preserve the **editorial restraint**: hairline rules, mono meta labels, big tight-tracked display type, lots of whitespace.
- The hero name, subtitle, all copy, and project text are final — port them verbatim.
- Replace all `#contact` placeholder hrefs (project rows, socials) with real destinations and swap placeholders for real imagery.
