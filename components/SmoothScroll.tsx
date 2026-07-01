"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Matches the sections' `scroll-margin-top` so anchored jumps clear the nav. */
const NAV_OFFSET = 90;

/**
 * Initializes Lenis smooth scrolling on the window and drives its rAF loop.
 * Anchor-link clicks are routed through `lenis.scrollTo` so in-page navigation
 * is smooth too. Disabled entirely when the user prefers reduced motion, in
 * which case native scrolling is used.
 */
export function SmoothScroll() {
  useEffect(() => {
    // Clear the pre-paint flag now that the client has mounted. GSAP's entrance
    // hooks run in layout effects (before this passive effect), so their inline
    // opacity already governs the fade — removing the CSS bridge won't flash.
    // Runs unconditionally so content is revealed even under reduced motion or
    // if GSAP failed to take over.
    document.documentElement.classList.remove("gsap-loading");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Keep GSAP ScrollTrigger in sync with Lenis's virtual scroll position.
    lenis.on("scroll", ScrollTrigger.update);

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
      const link = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      const id = link?.getAttribute("href");
      if (!id || id === "#") return;

      const el = document.querySelector(id);
      if (!el) return;

      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, {
        offset: id === "#top" ? 0 : -NAV_OFFSET,
      });
      history.pushState(null, "", id);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
