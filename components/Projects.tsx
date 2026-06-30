"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import { useScrollFade } from "@/hooks/useFade";
import { projects, type Project } from "@/lib/projects";

// Lightbox media is treated as a video when the source is a video file.
const isVideo = (src: string) => /\.(mp4|webm|ogg|mov)$/i.test(src);

const Projects = () => {
  const section = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<Project | null>(null);

  // Fades in as the section scrolls into view and out as it leaves.
  useScrollFade(section, { in: { start: "top 80%", end: "top 20%" } });

  // While the lightbox is open, lock body scroll and close on Escape.
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <div
      ref={section}
      id="projects"
      className="relative overflow-hidden p-8 lg:p-30 lg:px-40 w-full min-h-svh bg-white flex flex-col"
    >
      {/* Section Title */}
      <div className="font-serif text-5xl font-bold lg:w-1/3">
        Featured Projects
      </div>

      {/* Section Description */}
      <div className="mt-4 lg:mt-8 lg:w-3/8 text-lg lg:text-xl text-text-mute">
        Few from the numerous projects I have worked on with a variety of
        clients.
      </div>

      {/* Bento / masonry grid — 1 column mobile, 2 tablet, 3 desktop. New
          projects flow in automatically; tile height follows each `aspect`. */}
      <div className="mt-12 columns-1 gap-6 sm:mt-16 sm:columns-2 lg:columns-3">
        {projects.map((project, i) => {
          const landscape = project.aspect === "desktop";
          const openable = !!project.lightBox;

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

          const shared = "group mb-6 block w-full break-inside-avoid text-left";

          // Projects with a lightBox open the lightbox; the rest link to `href`.
          return openable ? (
            <button
              key={i}
              type="button"
              onClick={() => setLightbox(project)}
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

      {/* Lightbox — scrollable so tall (Behance-style) media can be panned. */}
      {lightbox?.lightBox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-90 flex items-center justify-center overflow-y-auto overscroll-contain bg-ink/80 p-4 backdrop-blur-sm motion-safe:animate-[fadeIn_200ms_ease-out] sm:p-8"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setLightbox(null)}
            className="fixed right-4 top-4 z-10 rounded-full bg-bg/90 p-2 text-ink transition hover:bg-bg"
          >
            <X size={20} />
          </button>

          <div onClick={(e) => e.stopPropagation()} className="my-auto">
            {isVideo(lightbox.lightBox.media) ? (
              <video
                src={lightbox.lightBox.media}
                controls
                autoPlay
                playsInline
                className="mx-auto max-h-[88vh] w-auto max-w-full rounded-md"
              />
            ) : (
              // Sized to fit the viewport while preserving its aspect ratio;
              // tall (Behance-style) media can still scroll within the overlay.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={lightbox.lightBox.media}
                alt={lightbox.title}
                className="mx-auto h-auto max-h-[88vh] w-auto max-w-full rounded-md object-contain"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
