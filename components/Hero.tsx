"use client";

import { useRef } from "react";
import { useFadeIn, useScrollFade } from "@/hooks/useFade";

const Hero = () => {
  const section = useRef<HTMLElement>(null);
  const root = useRef<HTMLDivElement>(null);

  // Cinematic fade-in on load, then fade the text out as the hero scrolls away.
  // The hero is already in view at load, so it skips the scroll fade-in and
  // finishes its fade-out ~60% through the section leaving.
  useFadeIn(root);
  useScrollFade(root, {
    trigger: section,
    fadeIn: false,
    out: { start: "top top", end: "60% top" },
  });

  return (
    <section
      id="hero"
      ref={section}
      className="relative flex min-h-svh items-center justify-center overflow-hidden px-5 text-center sm:px-8"
    >
      <div ref={root} className="relative text-sm">
        <p className="font-serif text-5xl font-semibold leading-none tracking-tight">
          Hello, I am Moses Kwágga
        </p>
        <p className="mt-3 font-light text-lg">A JavaScript web developer.</p>
      </div>
    </section>
  );
};

export default Hero;
