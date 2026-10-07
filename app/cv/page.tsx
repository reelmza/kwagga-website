import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Download, MapPin } from "lucide-react";
import { EmailLink } from "@/components/EmailLink";
import { cv, cvClients, cvProjects, linkLabel } from "@/lib/cv";

const TITLE = "Moses Kwagga — CV";
const DESCRIPTION =
  "CV of Moses Kwagga, full-stack web developer with seven years of experience and a cyber-security background. View online or download as PDF.";

// Its own OG/Twitter image lives alongside in opengraph-image.tsx /
// twitter-image.tsx, overriding the site-wide one.
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/cv" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/cv",
    siteName: "Moses Kwagga",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const PDF_HREF = "/cv/download";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="border-t border-line pt-4 font-mono text-xs uppercase tracking-[1.5px] text-meta">
      {children}
    </h2>
  );
}

export default function CvPage() {
  return (
    <main className="min-h-svh bg-bg px-5 py-6 sm:px-8 sm:py-10 lg:py-16 print:bg-white print:p-0">
      {/* Top bar — back to the portfolio + PDF download. Hidden when printing. */}
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 print:hidden">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm text-text-mute no-underline transition-colors hover:text-ink"
        >
          <ArrowLeft size={16} aria-hidden />
          Portfolio
        </Link>
        <a
          href={PDF_HREF}
          download="Moses-Kwagga-CV.pdf"
          className="flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-bg no-underline transition-colors hover:bg-accent hover:text-on-accent sm:px-5"
        >
          <Download size={16} aria-hidden />
          Download PDF
        </a>
      </div>

      <article className="mx-auto mt-6 max-w-5xl rounded-lg border border-line bg-white p-6 shadow-xs sm:mt-8 sm:p-10 lg:p-14 print:m-0 print:max-w-none print:border-0 print:p-0 print:shadow-none">
        {/* Header */}
        <header>
          <span className="font-mono text-xs uppercase tracking-[1.5px] text-meta">
            Curriculum Vitae
          </span>
          <h1 className="mt-4 font-serif text-[clamp(40px,8vw,84px)] font-bold leading-[0.95] tracking-[-0.03em]">
            {cv.name}
          </h1>
          <p className="mt-3 font-serif text-xl italic text-ink-soft sm:text-2xl">
            {cv.role}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-text-mute">
            <EmailLink
              user={cv.email.user}
              domain={cv.email.domain}
              className="border-b border-accent text-ink no-underline transition-colors hover:text-accent-strong"
            />
            <a
              href={cv.phone.href}
              className="whitespace-nowrap no-underline transition-colors hover:text-ink"
            >
              {cv.phone.label}
            </a>
            {cv.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all no-underline transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            ))}
            <span className="flex items-center gap-1">
              <MapPin size={14} aria-hidden className="shrink-0" />
              {cv.location}
            </span>
          </div>
        </header>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
          {/* Main column */}
          <div className="min-w-0 space-y-12">
            <section>
              <SectionLabel>Profile</SectionLabel>
              <p className="mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">
                {cv.summary}
              </p>
            </section>

            <section>
              <SectionLabel>Experience</SectionLabel>
              {cv.experience.map((job) => (
                <div key={job.role} className="mt-5 [&+&]:mt-9">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-serif text-xl font-bold">{job.role}</h3>
                    <span className="font-mono text-xs text-text-mute">
                      {job.period}
                    </span>
                  </div>
                  <p className="text-sm text-text-mute">{job.org}</p>
                  <ul className="mt-4 space-y-2.5">
                    {job.points.map((point) => (
                      <li
                        key={point}
                        className="relative pl-5 text-base leading-relaxed text-ink-soft before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2.5 before:bg-accent"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            <section>
              <SectionLabel>Selected Projects</SectionLabel>
              <ul className="mt-2 divide-y divide-line">
                {cvProjects.map((p) => {
                  const label = linkLabel(p.href);
                  return (
                    <li key={p.title} className="py-4">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="font-serif text-lg font-bold leading-tight">
                          {p.title}
                        </h3>
                        <span className="shrink-0 font-mono text-xs text-text-mute">
                          {p.year}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-text-mute">
                        {p.description}
                      </p>
                      {label && (
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1.5 inline-flex items-center gap-1 text-sm text-ink no-underline transition-colors hover:text-accent-strong"
                        >
                          {label}
                          <ArrowUpRight size={14} aria-hidden />
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>

          {/* Side column */}
          <aside className="min-w-0 space-y-12">
            <section>
              <SectionLabel>Skills</SectionLabel>
              <div className="mt-5 space-y-5">
                {cv.skills.map((s) => (
                  <div key={s.group}>
                    <h3 className="text-sm font-medium text-ink">{s.group}</h3>
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {s.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-line bg-bg px-2.5 py-1 text-xs text-ink-soft"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <SectionLabel>Education</SectionLabel>
              {cv.education.map((e) => (
                <div key={e.qualification} className="mt-5">
                  <h3 className="font-serif text-lg font-bold">
                    {e.qualification}
                  </h3>
                  {e.institution && (
                    <p className="text-sm text-text-mute">{e.institution}</p>
                  )}
                  {e.period && (
                    <p className="font-mono text-xs text-text-mute">{e.period}</p>
                  )}
                </div>
              ))}
            </section>

            <section>
              <SectionLabel>Clients</SectionLabel>
              <ul className="mt-5 space-y-1.5 text-sm text-ink-soft">
                {cvClients.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </article>
    </main>
  );
}
