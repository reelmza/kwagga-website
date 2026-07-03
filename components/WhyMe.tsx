"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useScrollFade } from "@/hooks/useFade";

type Reason = {
  title: string;
  body: string;
};

// The three things that set the work apart — security depth, longevity, and
// real production experience.
const REASONS: Reason[] = [
  {
    title: "Security is built in.",
    body: "As a cyber-security major, I understand web security from the inside. The apps I build are hardened against the threats most developers only find out about after they ship.",
  },
  {
    title: "Seven years of shipping.",
    body: "I've been writing code and building for the web for seven years. The craft is second nature and the fundamentals are muscle memory, so I move fast without cutting corners.",
  },
  {
    title: "Battle-tested in production.",
    body: "I've worked on real-world projects and know the issues and pain that only surface in production; so I design for the edge cases long before they have a chance to bite.",
  },
];

const WhyMe = () => {
  const section = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);

  // Fades in as the section scrolls into view and out as it leaves.
  useScrollFade(section, { in: { start: "top 80%", end: "top 20%" } });

  // Reasons rise + fade in with a light stagger as the list scrolls in.
  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(list.current!.children, {
          opacity: 0,
          y: 24,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: { trigger: list.current, start: "top 85%" },
        });
      });
    },
    { scope: list },
  );

  return (
    <div
      ref={section}
      id="why"
      className="relative overflow-hidden p-8 lg:p-30 lg:px-40 w-full min-h-svh bg-bg flex flex-col"
    >
      {/* Section Title */}
      <div className="font-serif text-3xl font-bold sm:text-4xl lg:w-1/2 lg:text-5xl">
        Why me?
      </div>

      {/* Section Description */}
      <div className="mt-4 lg:mt-8 lg:w-3/8 text-base sm:text-lg lg:text-xl text-text-mute">
        Security depth, hard-earned experience, and a few production scars; here
        is what you get.
      </div>

      {/* Reasons — stacked on mobile, three columns on desktop, each with its
          own hairline rule for editorial separation. */}
      <ul
        ref={list}
        className="mt-12 grid gap-x-10 gap-y-10 sm:mt-16 sm:grid-cols-3"
      >
        {REASONS.map((reason, i) => (
          <li key={reason.title} className="border-t border-line pt-6">
            <span className="font-mono text-xs text-meta">0{i + 1}</span>
            <h3 className="mt-5 font-serif text-xl font-bold leading-tight sm:text-2xl">
              {reason.title}
            </h3>
            <p className="mt-3 text-base text-text-mute sm:text-lg">
              {reason.body}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WhyMe;
