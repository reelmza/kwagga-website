"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useFadeIn } from "@/hooks/useFade";

const LINKS = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#clients", label: "Clients" },
  { href: "#contact", label: "Contact" },
];

const Nav = () => {
  const nav = useRef<HTMLElement>(null);

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

  return (
    <nav
      ref={nav}
      className="fixed top-0 left-0 z-60 w-full bg-bg/70 backdrop-blur-xs supports-backdrop-filter:bg-transparent max-[720px]:hidden"
    >
      <ul className="flex items-center justify-center gap-5 py-6 lg:gap-10">
        {LINKS.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="text-sm font-normal text-ink no-underline transition-colors hover:text-ink/70"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
