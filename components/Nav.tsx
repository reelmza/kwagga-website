"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Menu, X } from "lucide-react";
import { useFadeIn } from "@/hooks/useFade";

// In page order, so the links read top-to-bottom like the page.
const LINKS = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#why", label: "Why Me" },
  { href: "#clients", label: "Clients" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

const Nav = () => {
  const nav = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  // Just the entrance fade — the nav comes into view with the hero. It's fixed,
  // so it never fades out on scroll.
  useFadeIn(nav);

  // Hide on scroll down, reveal on scroll up (the "headroom" pattern).
  useGSAP(
    () => {
      const el = nav.current;
      if (!el) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const setY = gsap.quickTo(el, "yPercent", {
        duration: reduce ? 0 : 0.4,
        ease: "power2.out",
      });

      let last = window.scrollY;
      const onScroll = () => {
        const y = window.scrollY;
        // Ignore tiny jitters so the nav doesn't flicker.
        if (Math.abs(y - last) < 8) return;
        // Slide up out of view going down (past the top); reveal going up.
        setY(y > last && y > 80 ? -120 : 0);
        last = y;
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    },
    { scope: nav },
  );

  // While the mobile menu is open: lock body scroll, close on Escape, and move
  // focus into the menu (returning it to the toggle on close).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    close.current?.focus();
    const trigger = toggle.current;
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      trigger?.focus({ preventScroll: true });
    };
  }, [open]);

  // Close the menu if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 721px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <nav
        ref={nav}
        data-fade
        className="fixed top-0 left-0 z-60 w-full bg-bg/70 backdrop-blur-xs supports-backdrop-filter:bg-transparent"
      >
        {/* Desktop: centered links. */}
        <ul className="flex items-center justify-center gap-5 py-6 lg:gap-10 max-[720px]:hidden">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-normal text-ink no-underline transition-colors hover:text-accent-strong"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile: wordmark + menu toggle. */}
        <div className="hidden items-center justify-between px-5 py-4 max-[720px]:flex">
          <a
            href="#hero"
            className="font-serif text-lg font-semibold text-ink no-underline"
          >
            Kwágga
          </a>
          <button
            ref={toggle}
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
            className="-mr-2 p-2 text-ink"
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* Full-screen mobile menu. Rendered outside the <nav> because the nav's
          GSAP transform would otherwise contain this fixed overlay.
          `data-lenis-prevent` stops Lenis from scrolling the page behind it. */}
      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          data-lenis-prevent
          className="fixed inset-0 z-70 flex flex-col overflow-y-auto bg-bg px-5 motion-safe:animate-[fadeIn_200ms_ease-out]"
        >
          <div className="flex items-center justify-end py-4">
            <button
              ref={close}
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="-mr-2 p-2 text-ink"
            >
              <X size={22} />
            </button>
          </div>

          <ul className="flex flex-1 flex-col justify-center gap-6 pb-16">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-serif text-4xl font-bold text-ink no-underline transition-colors hover:text-accent-strong"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Nav;
