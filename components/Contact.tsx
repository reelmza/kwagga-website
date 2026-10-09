import { ArrowUpRight } from "lucide-react";
import { EMAIL } from "@/lib/site";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/reelmza" },
  { label: "LinkedIn", href: "https://linkedin.com/in/moseskwagga" },
  { label: "X", href: "https://x.com/moseskwagga" },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-22.5 border-t border-line px-8 pt-24 pb-0 lg:px-40 lg:pt-30"
    >
      <span className="font-mono text-xs uppercase tracking-[1.5px] text-meta">
        Contact
      </span>
      <h2 className="mt-7 mb-10 font-serif text-[clamp(36px,7vw,110px)] font-bold leading-[0.94] tracking-[-0.04em] text-balance">
        Let&apos;s build something
        <br />
        secure together.
      </h2>

      <div className="flex flex-wrap items-baseline gap-x-14 gap-y-4">
        <a
          href={`mailto:${EMAIL}`}
          className="border-b-2 border-accent px-1 pb-1 text-[clamp(10px,2vw,30px)] font-semibold tracking-[-0.02em] text-ink no-underline transition-colors duration-300 hover:bg-accent hover:text-on-accent"
        >
          {EMAIL}
        </a>
        <div className="flex gap-7">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="flex items-center gap-2 text-sm font-medium text-text-mute no-underline transition-colors hover:text-ink"
            >
              <span>{s.label}</span>
              <ArrowUpRight size={12} />
            </a>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line py-6.5">
        <span className="font-mono text-xs text-meta">Kwagga — © 2026</span>
        <span className="font-mono text-xs text-meta">Lagos, WAT · v1.1</span>
      </div>
    </section>
  );
}
