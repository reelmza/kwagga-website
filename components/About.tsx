"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useScrollFade } from "@/hooks/useFade";
import { tools } from "@/lib/tools";

const About = () => {
  const section = useRef<HTMLDivElement>(null);
  const stack = useRef<HTMLUListElement>(null);

  // Fades in as the section scrolls into view and out as it leaves.
  useScrollFade(section, { in: { start: "top 80%", end: "top 20%" } });

  // Tool chips rise + fade in with a light stagger as the list scrolls in.
  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(stack.current!.children, {
          opacity: 0,
          y: 24,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: { trigger: stack.current, start: "top 85%" },
        });
      });
    },
    { scope: stack },
  );

  return (
    <div
      ref={section}
      className="relative overflow-hidden p-8 lg:p-30 lg:px-40 w-full min-h-svh bg-white  flex flex-col"
    >
      {/* Section Title */}
      <div className="font-serif text-3xl font-bold sm:text-4xl lg:w-1/3 lg:text-5xl">
        What can I do for you?
      </div>

      {/* Section Description */}
      <div className="mt-4 lg:mt-8 lg:w-3/8 text-base sm:text-lg lg:text-xl text-text-mute">
        From designing eye catching apps to implementing complex bussiness
        logics, I've got the tools for it.
      </div>

      {/* Tools & stack */}
      <ul ref={stack} className="mt-10 flex flex-wrap gap-3 sm:mt-14">
        {tools.map((tool) => (
          <li
            key={tool.name}
            className="flex items-center gap-2.5 rounded-full border border-line bg-bg px-4 py-2.5 transition-colors hover:border-ink/20 sm:py-2"
          >
            <Image
              src={tool.icon}
              alt={tool.name}
              width={28}
              height={28}
              className="h-7 w-7 object-contain grayscale sm:h-6 sm:w-6"
            />
            <span className="text-base">{tool.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default About;
