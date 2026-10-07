import { projects, type Project } from "@/lib/projects";
import { clients } from "@/lib/clients";

/**
 * Single source of truth for the CV — rendered by the /cv page, the PDF at
 * /cv/download and the /cv OG image. Projects and clients are pulled from
 * their own data files so the CV never drifts from the portfolio.
 */

export const cv = {
  name: "Moses Kwagga",
  role: "Full-stack Web Developer",
  location: "Abuja, Nigeria",
  email: { user: "jessemoses71", domain: "gmail.com" },
  phone: { label: "+234 814 6372 583", href: "tel:+2348146372583" },
  links: [
    { label: "kwagga.dev", href: "https://kwagga.dev" },
    { label: "github.com/reelmza", href: "https://github.com/reelmza" },
    {
      label: "linkedin.com/in/moseskwagga",
      href: "https://linkedin.com/in/moseskwagga",
    },
  ],

  summary:
    "Full-stack web developer with seven years of experience and a cyber-security background. I build secure, production-ready apps for businesses and institutions across healthcare, fintech, logistics and education, with a focus on performance and user experience.",

  experience: [
    {
      role: "Software Developer",
      org: "OayasTech Nigeria Limited",
      period: "2024 — 2026",
      points: [
        "Built web and mobile solutions for the company's clients, including computer-based testing platforms, business portfolios and business management software.",
        "Set up networks and managed hardware for clients.",
      ],
    },
    {
      role: "Freelance Full-stack Developer",
      org: "Self-employed",
      period: "2019 — Present",
      points: [
        `Designed, built and shipped web platforms for ${clients.length}+ clients across healthcare, fintech, logistics, education and architecture.`,
        "Built openCBT, computer-based testing software for Nigerian universities, deployable online or on a university's own servers.",
        "Security-first development: apps hardened against common web threats from the start, not after launch.",
      ],
    },
  ],

  education: [
    {
      qualification: "BSc Cyber Security",
      institution: "Bingham University, Karu, Nasarawa State",
      period: "2021 — 2025",
    },
  ],

  skills: [
    {
      group: "Frontend",
      items: ["JavaScript", "HTML5", "CSS", "React", "Next.js", "Tailwind CSS"],
    },
    {
      group: "Backend & Data",
      items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Prisma", "Supabase"],
    },
    {
      group: "Security & Tooling",
      items: ["Web application security", "Docker", "Linux", "GitHub", "Figma"],
    },
  ],

  // Shown in this order; titles must match lib/projects.ts.
  projectTitles: [
    "U & I Medics",
    "openCBT",
    "Pagedeck App",
    "SaukiPay",
    "MotoSprint Logistics",
    "NTEAP Portal",
    "SBA Reads App",
    "Timeless Di-zin",
  ],
};

export const cvProjects: Project[] = cv.projectTitles
  .map((title) => projects.find((p) => p.title === title))
  .filter((p): p is Project => Boolean(p));

export const cvClients = clients.map((c) => c.name);

export const cvEmail = `${cv.email.user}@${cv.email.domain}`;

/** Short, human label for a project link ("saukipay.net", "Google Play"). */
export function linkLabel(href: string): string | null {
  if (!/^https?:\/\//.test(href)) return null;
  const host = new URL(href).hostname.replace(/^www\./, "");
  return host === "play.google.com" ? "Google Play" : host;
}
