"use client";

import { useRef } from "react";
import { useScrollFade } from "@/hooks/useFade";

const About = () => {
  const section = useRef<HTMLDivElement>(null);

  // Fades in as the section scrolls into view and out as it leaves.
  useScrollFade(section, { in: { start: "top 80%", end: "top 20%" } });

  return (
    <div
      ref={section}
      className="relative overflow-hidden p-8 lg:p-30 lg:px-40 w-full min-h-svh bg-white  flex flex-col"
    >
      {/* Section Title */}
      <div className="font-serif text-5xl font-bold lg:w-1/3">
        What can I do for you?
      </div>

      {/* Section Description */}
      <div className="mt-4 lg:mt-8 lg:w-3/8 text-lg lg:text-xl text-text-mute">
        From designing eye catching apps to implementing complex bussiness
        logics.
      </div>
    </div>
  );
};

export default About;
