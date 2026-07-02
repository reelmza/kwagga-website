export type Tool = {
  name: string;
  icon: string;
};

/** Tools & stack shown in the About section, in a rough language → framework →
 *  styling → data → devops order. Icons live in /public/images/tools. */
export const tools: Tool[] = [
  { name: "JavaScript", icon: "/images/tools/js.svg" },
  { name: "HTML5", icon: "/images/tools/html5.svg" },
  { name: "CSS", icon: "/images/tools/css.svg" },
  { name: "React", icon: "/images/tools/react.svg" },
  { name: "Next.js", icon: "/images/tools/next.svg" },
  { name: "Node.js", icon: "/images/tools/node.svg" },
  { name: "Express", icon: "/images/tools/express.svg" },
  { name: "Tailwind CSS", icon: "/images/tools/tailwindcss.svg" },
  { name: "MongoDB", icon: "/images/tools/mongo.svg" },
  { name: "PostgreSQL", icon: "/images/tools/postgress.svg" },
  { name: "Prisma", icon: "/images/tools/prisma.svg" },
  { name: "Supabase", icon: "/images/tools/supabase.svg" },
  { name: "Docker", icon: "/images/tools/docker.svg" },
  { name: "Linux", icon: "/images/tools/linux.svg" },
  { name: "GitHub", icon: "/images/tools/github.svg" },
  { name: "Figma", icon: "/images/tools/figma.svg" },
  { name: "Claude", icon: "/images/tools/claude.svg" },
];
