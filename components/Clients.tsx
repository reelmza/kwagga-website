"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useScrollFade } from "@/hooks/useFade";
import { clients, type Client } from "@/lib/clients";

const Clients = () => {
  const section = useRef<HTMLDivElement>(null);
  const grid = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState<Client | null>(null);

  // Fades in as the section scrolls into view and out as it leaves.
  useScrollFade(section, { in: { start: "top 80%", end: "top 20%" } });

  // Logos rise + fade in with a light stagger as the grid scrolls into view.
  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(grid.current!.children, {
          opacity: 0,
          y: 24,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: { trigger: grid.current, start: "top 85%" },
        });
      });
    },
    { scope: grid },
  );

  return (
    <div
      ref={section}
      className="relative overflow-hidden p-8 lg:p-30 lg:px-40 w-full min-h-svh bg-white flex flex-col"
    >
      {/* Section Title */}
      <div className="font-serif text-3xl text-right font-bold sm:text-4xl lg:w-1/3 lg:text-5xl self-end">
        Clients I have worked with.
      </div>

      {/* Section Description */}
      <div className="mt-4 lg:mt-8 lg:w-3/8 text-base sm:text-lg lg:text-xl text-text-mute text-right self-end">
        A gallery of industry icons and individuals I have worked with over the
        years.
      </div>

      {/* Hovered client info — fixed-height slot, blank until a logo is hovered.
          Desktop only (hover-driven), so it's hidden on mobile. */}
      <div
        aria-hidden={!active}
        className="mt-5 hidden h-12 border-t border-line text-center transition-opacity duration-300 motion-reduce:transition-none lg:block"
        style={{ opacity: active ? 1 : 0 }}
      >
        {/* Re-keyed per client so the text re-fades when you move between logos. */}
        <div
          key={active?.name}
          className="h-full flex flex-wrap items-center gap-x-6 gap-y-1"
        >
          <h3 className="font-serif text-2xl font-bold leading-none">
            {active?.name}
          </h3>
          <p className="text-text-mute leading-none mt-1">
            {active?.clientType.trim()}
          </p>
          <p className="flex items-center gap-1.5 text-sm text-text-mute mt-1">
            <MapPin size={14} className="shrink-0" />
            {active?.location}
          </p>
        </div>
      </div>

      {/* Client logos */}
      <ul
        ref={grid}
        onMouseLeave={() => setActive(null)}
        className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2 sm:mt-0 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-3 lg:grid-cols-5"
      >
        {clients.map((client) => (
          <li
            key={client.name}
            onMouseEnter={() => setActive(client)}
            className="group relative flex aspect-3/2 items-center justify-center p-6 sm:p-8 lg:cursor-pointer"
          >
            <Image
              src={client.image}
              alt={client.name}
              width={200}
              height={120}
              className="h-auto max-h-12 w-auto max-w-[70%] object-contain grayscale transition duration-300 group-hover:grayscale-0 sm:max-h-14"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Clients;
