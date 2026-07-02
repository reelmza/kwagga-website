"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useScrollFade } from "@/hooks/useFade";
import { projects, type Project } from "@/lib/projects";

// A lightbox entry is treated as a video when its source is a video file.
const isVideo = (src: string) => /\.(mp4|webm|ogg|mov)$/i.test(src);

// Only real destinations get a "Visit Project" link — placeholders like "#" or
// "#contact" render nothing.
const isExternal = (href: string) => /^https?:\/\//.test(href);

const Projects = () => {
  const section = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<Project | null>(null);
  const [index, setIndex] = useState(0);

  const images = lightbox?.lightBox ?? [];
  const count = images.length;

  // Fades in as the section scrolls into view and out as it leaves.
  useScrollFade(section, { in: { start: "top 80%", end: "top 20%" } });

  const open = (project: Project) => {
    setIndex(0);
    setLightbox(project);
  };

  // Step through the gallery, wrapping around at either end.
  const go = (dir: number) =>
    setIndex((i) => (count ? (i + dir + count) % count : 0));

  // While the lightbox is open: lock body scroll, close on Escape, and step the
  // gallery with the arrow keys.
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox]);

  return (
    <div
      ref={section}
      id="projects"
      className="relative overflow-hidden p-8 lg:p-30 lg:px-40 w-full min-h-svh bg-white flex flex-col"
    >
      {/* Section Title */}
      <div className="font-serif text-3xl font-bold sm:text-4xl lg:w-1/3 lg:text-5xl">
        Featured Projects
      </div>

      {/* Section Description */}
      <div className="mt-4 lg:mt-8 lg:w-3/8 text-base sm:text-lg lg:text-xl text-text-mute">
        Few from the numerous projects I have worked on with a variety of
        clients.
      </div>

      {/* Bento / masonry grid — 1 column mobile, 2 tablet, 3 desktop. New
          projects flow in automatically; tile height follows each `aspect`. */}
      <div className="mt-12 columns-1 gap-6 sm:mt-16 sm:columns-2 lg:columns-3">
        {projects.map((project, i) => {
          const landscape = project.aspect === "desktop";
          const openable = (project.lightBox?.length ?? 0) > 0;

          const inner = (
            <>
              <div
                className={`relative overflow-hidden rounded-md bg-placeholder-a ${
                  landscape ? "aspect-16/10" : "aspect-3/4"
                }`}
              >
                {project.previewImage && (
                  <Image
                    src={project.previewImage}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-500 motion-safe:group-hover:scale-105"
                  />
                )}
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-4">
                <h3 className="flex items-center gap-1.5 font-serif text-lg font-bold leading-tight">
                  {project.title}
                  {/* External-link cue: this project leaves the site. */}
                  {!openable && (
                    <ArrowUpRight
                      size={16}
                      aria-hidden
                      className="shrink-0 text-text-mute transition-colors group-hover:text-ink"
                    />
                  )}
                </h3>
                <span className="shrink-0 font-mono text-xs text-text-mute">
                  {project.year}
                </span>
              </div>
              <p className="mt-1 text-sm text-text-mute">
                {project.description}
              </p>
            </>
          );

          const shared =
            "group mb-6 block w-full break-inside-avoid rounded-lg border border-line p-3 text-left outline-none transition-colors hover:border-ink/20 focus-visible:outline-none";

          // Projects with a lightBox open the gallery; the rest link to `href`.
          return openable ? (
            <button
              key={i}
              type="button"
              onClick={() => open(project)}
              className={`${shared} cursor-pointer`}
            >
              {inner}
            </button>
          ) : (
            <a
              key={i}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className={shared}
            >
              {inner}
            </a>
          );
        })}
      </div>

      {/* Lightbox gallery — navigable, scroll-locked, closes on backdrop/Escape. */}
      {lightbox && count > 0 && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-90 flex flex-col items-center justify-center overscroll-contain bg-ink/85 p-4 backdrop-blur-sm motion-safe:animate-[fadeIn_200ms_ease-out] sm:p-6"
        >
          {/* Close */}
          <button
            type="button"
            aria-label="Close"
            onClick={() => setLightbox(null)}
            className="fixed right-4 top-4 z-10 rounded-full bg-bg/90 p-2 text-ink outline-none transition hover:bg-bg"
          >
            <X size={20} />
          </button>

          {/* Media stage — prev/next sit in the side gutters so they never cover
              the image, even on small screens. */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex min-h-0 w-full max-w-5xl flex-1 items-center justify-center px-12 sm:px-16"
          >
            {count > 1 && (
              <button
                type="button"
                aria-label="Previous image"
                onClick={() => go(-1)}
                className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-bg/90 p-2 text-ink outline-none transition hover:bg-bg sm:p-3"
              >
                <ChevronLeft size={22} />
              </button>
            )}

            {isVideo(images[index]) ? (
              <video
                key={images[index]}
                src={images[index]}
                controls
                autoPlay
                playsInline
                className="max-h-full w-auto max-w-full rounded-md"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={images[index]}
                src={images[index]}
                alt={`${lightbox.title} — ${index + 1} of ${count}`}
                className="max-h-full w-auto max-w-full rounded-md object-contain motion-safe:animate-[fadeIn_200ms_ease-out]"
              />
            )}

            {count > 1 && (
              <button
                type="button"
                aria-label="Next image"
                onClick={() => go(1)}
                className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-bg/90 p-2 text-ink outline-none transition hover:bg-bg sm:p-3"
              >
                <ChevronRight size={22} />
              </button>
            )}
          </div>

          {/* Footer: image counter + optional visit link. */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="mt-4 flex shrink-0 items-center gap-5"
          >
            {count > 1 && (
              <span className="font-mono text-xs text-bg/70">
                {index + 1} / {count}
              </span>
            )}
            {isExternal(lightbox.href) && (
              <a
                href={lightbox.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-bg underline decoration-bg/40 underline-offset-4 outline-none transition hover:decoration-bg"
              >
                Visit Project
                <ArrowUpRight size={16} aria-hidden className="shrink-0" />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
