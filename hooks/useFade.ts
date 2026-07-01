"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

// All fades respect reduced motion: they only run when motion is allowed, so
// reduced-motion users keep everything at its visible rest state.
const ALLOW_MOTION = "(prefers-reduced-motion: no-preference)";

type Ref = RefObject<HTMLElement | null>;

/**
 * Cinematic, time-based fade-in on load. For above-the-fold or fixed elements
 * (hero text, nav) that should simply appear when the page first renders.
 */
export function useFadeIn(target: Ref, { duration = 2 }: { duration?: number } = {}) {
  useGSAP(
    () => {
      gsap.matchMedia().add(ALLOW_MOTION, () => {
        // Explicit fromTo (not `from`): `from` animates to the element's current
        // value, which the pre-paint anti-flash CSS forces to opacity 0 — that
        // would animate 0 → 0 and leave the element blank. Pin the target to 1.
        gsap.fromTo(
          target.current,
          { opacity: 0 },
          { opacity: 1, ease: "power1.inOut", duration },
        );
      });
    },
    { scope: target },
  );
}

type Range = { start: string; end: string };

type ScrollFadeOptions = {
  /** Element whose scroll position drives the fade. Defaults to the target. */
  trigger?: Ref;
  /** Fade up as the element scrolls into view. */
  fadeIn?: boolean;
  /** Fade down as the element scrolls away. */
  fadeOut?: boolean;
  /** Override the scroll range for the fade-in / fade-out. */
  in?: Range;
  out?: Range;
};

// Defaults tuned for a normal in-flow section passing through the viewport.
const IN: Range = { start: "top 80%", end: "top 45%" };
const OUT: Range = { start: "bottom 60%", end: "bottom 15%" };

/**
 * Scroll-linked opacity fade. Fades the target up as it enters the viewport and
 * back down as it leaves, scrubbed to scroll position. Use on sections that
 * should fade in and out as you pass through them. Pass `fadeIn: false` (and an
 * `out` range) to reuse just the fade-out — e.g. the hero, which fades in on
 * load and only needs the scroll fade-out.
 */
export function useScrollFade(
  target: Ref,
  {
    trigger,
    fadeIn = true,
    fadeOut = true,
    in: inRange = IN,
    out: outRange = OUT,
  }: ScrollFadeOptions = {},
) {
  useGSAP(
    () => {
      gsap.matchMedia().add(ALLOW_MOTION, () => {
        const driver = (trigger ?? target).current;

        if (fadeIn) {
          gsap.fromTo(
            target.current,
            { opacity: 0 },
            {
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: driver,
                start: inRange.start,
                end: inRange.end,
                scrub: 0.5,
              },
            },
          );
        }

        if (fadeOut) {
          // Explicit fromTo + immediateRender:false so it neither captures a
          // transient start value nor clobbers an entrance fade at load.
          gsap.fromTo(
            target.current,
            { opacity: 1 },
            {
              opacity: 0,
              ease: "none",
              immediateRender: false,
              scrollTrigger: {
                trigger: driver,
                start: outRange.start,
                end: outRange.end,
                scrub: 0.5,
              },
            },
          );
        }
      });
    },
    { scope: target },
  );
}
