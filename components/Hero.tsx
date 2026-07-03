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
      <div ref={root} data-fade className="relative text-sm">
        <p className="font-serif text-2xl font-semibold leading-none tracking-tight sm:text-4xl md:text-5xl">
          Hello, I am Moses <span className="">Kwágga</span>
        </p>
        <p className="mt-3 font-light text-base sm:text-lg">
          A Full-stack web developer.
        </p>
      </div>
    </section>
  );
};

export default Hero;
