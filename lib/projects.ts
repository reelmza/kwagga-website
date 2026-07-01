export type Project = {
  index: string;
  title: string;
  description: string;
  tags: string;
  year: string;
  href: string;
  previewLabel: string;
  aspect: "desktop" | "mobile";
  previewImage?: string;
  lightBox?: string[];
};

export const projects: Project[] = [
  {
    index: "01",
    title: "Timeless Di-zin",
    description: "Brand & portfolio site — Architectural firm in Abuja.",
    tags: "Design · Frontend",
    year: "2026",
    href: "https://timelessdizin.com",
    previewLabel: "[ timeless di-zin ]",
    previewImage: "/images/featured-projects/timeless.png",
    aspect: "desktop",
    lightBox: ["/images/featured-projects/timeless.png"],
  },
  {
    index: "02",
    title: "CBT Exam Platform",
    description:
      "Computer-based testing platform serving Nigerian universities.",
    tags: "React · Security",
    year: "2026",
    href: "#",
    previewLabel: "[ oayastech cbt ]",
    previewImage: "/images/featured-projects/oayastech.png",
    aspect: "desktop",
    lightBox: [
      "/images/featured-projects/ebsu1.png",
      "/images/featured-projects/ebsu2.png",
      "/images/featured-projects/ebsu3.png",
      "/images/featured-projects/ebsu4.png",
    ],
  },
  {
    index: "03",
    title: "SaukiPay",
    description:
      "Online payment platform for African businesses and consumers.",
    tags: "Frontend",
    year: "2025",
    href: "https://saukipay.net",
    previewLabel: "[ saukipay portfolios ]",
    previewImage: "/images/featured-projects/sauki.png",
    aspect: "mobile",
    lightBox: [
      "/images/featured-projects/saukipay1.png",
      "/images/featured-projects/saukipay2.png",
      "/images/featured-projects/saukipay3.png",
      "/images/featured-projects/saukipay4.png",
    ],
  },

  {
    index: "04",
    title: "Ecoride App Dashboard",
    description: "EV ride-hailing app for Nigerian commuters.",
    tags: "Frontend",
    year: "2025",
    href: "#",
    previewLabel: "[ ecoride dashboard ]",
    previewImage: "/images/featured-projects/ecoride1.png",
    aspect: "desktop",
    lightBox: [
      "/images/featured-projects/ecoride1.png",
      "/images/featured-projects/ecoride2.png",
      "/images/featured-projects/ecoride3.png",
      "/images/featured-projects/ecoride4.png",
    ],
  },

  {
    index: "05",
    title: "SBA Reads App",
    description:
      "Online reading and publishing platform for Nigerian writters.",
    tags: "Frontend",
    year: "2025",
    href: "https://sbareads.com",
    previewLabel: "[ sbareads app ]",
    previewImage: "/images/featured-projects/sbareads1.webp",
    aspect: "mobile",
    lightBox: [
      "/images/featured-projects/sbareads1.webp",
      "/images/featured-projects/sbareads2.webp",
      "/images/featured-projects/sbareads3.webp",
    ],
  },

  {
    index: "06",
    title: "MotoSprint Logistics",
    description:
      "Logistics platform for motorcycle delivery services in Nigeria",
    tags: "React · Security",
    year: "2025",
    href: "https://play.google.com/store/apps/details?id=com.motosprint.app&hl=en",
    previewLabel: "[ motosprint logistics ]",
    previewImage: "/images/featured-projects/motosprint3.webp",
    aspect: "mobile",
    lightBox: [
      "/images/featured-projects/motosprint1.webp",
      "/images/featured-projects/motosprint2.webp",
      "/images/featured-projects/motosprint3.webp",
      "/images/featured-projects/motosprint4.webp",
    ],
  },

  {
    index: "07",
    title: "NTEAP Portal",
    description:
      "Nigerian Tertiary Education Access Portal for students and universities",
    tags: "Frontend",
    year: "2025",
    href: "https://nteap.com",
    previewLabel: "[ nteap portfolios ]",
    previewImage: "/images/featured-projects/nteap1.png",
    aspect: "desktop",
    lightBox: [
      "/images/featured-projects/nteap1.png",
      "/images/featured-projects/nteap2.png",
    ],
  },

  {
    index: "08",
    title: "Basif Farms Integrated",
    description: "Agricultural and manufacturing portfolio",
    tags: "Frontend",
    year: "2025—26",
    href: "#contact",
    previewLabel: "[ basiffarms portfolios ]",
    previewImage: "/images/featured-projects/basiffarms.png",
    aspect: "desktop",
    lightBox: ["/images/featured-projects/basiffarms.png"],
  },

  {
    index: "09",
    title: "AGEFADD Belgium",
    description: "Professional services and consultants",
    tags: "Frontend",
    year: "2024",
    href: "https://agefadd.eu",
    previewLabel: "[ agefadd portfolios ]",
    previewImage: "/images/featured-projects/agefadd.png",
    aspect: "desktop",
    lightBox: ["/images/featured-projects/agefadd.png"],
  },
];
