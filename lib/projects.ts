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
  lightBox?: {
    media: string;
  };
};

// /** Secondary links rendered as inline badges under the Selected Work list. */
// export const otherProjects: string[] = [
//   "https://timelessdizin.com",
//   "https://basiffarmsintegrated.ng/",
//   "https://agefadd.eu",
//   "https://nteap.com",
//   "https://saukipay.net",
//   "https://oayastech.com",
//   "https://www.motosprintlogistics.com/",
//   "https://www.sundayadams.net/",
// ];

export const projects: Project[] = [
  {
    index: "01",
    title: "Timeless Di-zin",
    description: "Brand & portfolio site — Architectural firm in Abuja",
    tags: "Design · Frontend",
    year: "2025",
    href: "#contact",
    previewLabel: "[ timeless di-zin ]",
    previewImage: "/images/featured-projects/timeless.png",
    aspect: "mobile",
    lightBox: {
      media: "/images/featured-projects/timeless.png",
    },
  },
  {
    index: "02",
    title: "OayasTech CBT Raw",
    description:
      "Computer-based testing platform serving Nigerian universities",
    tags: "React · Security",
    year: "2024",
    href: "#contact",
    previewLabel: "[ oayastech cbt ]",
    previewImage: "/images/featured-projects/oayastech.png",
    aspect: "desktop",
    lightBox: {
      media: "/images/featured-projects/oayastech.png",
    },
  },
  {
    index: "03",
    title: "SaukiPay",
    description: "Online payment platform for African businesses and consumers",
    tags: "Frontend",
    year: "2025—26",
    href: "#contact",
    previewLabel: "[ saukipay portfolios ]",
    previewImage: "/images/featured-projects/sauki.png",
    aspect: "mobile",
    lightBox: {
      media: "/images/featured-projects/timeless.png",
    },
  },

  {
    index: "04",
    title: "SaukiX",
    description: "Online payment platform for African businesses and consumers",
    tags: "Frontend",
    year: "2025—26",
    href: "#contact",
    previewLabel: "[ saukipay portfolios ]",
    previewImage: "/images/featured-projects/sauki.png",
    aspect: "desktop",
    lightBox: {
      media: "/images/featured-projects/timeless.png",
    },
  },

  {
    index: "05",
    title: "SaukiPay",
    description: "Online payment platform for African businesses and consumers",
    tags: "Frontend",
    year: "2025—26",
    href: "#contact",
    previewLabel: "[ saukipay portfolios ]",
    previewImage: "/images/featured-projects/sauki.png",
    aspect: "mobile",
    lightBox: {
      media: "/images/featured-projects/timeless.png",
    },
  },

  {
    index: "06",
    title: "OayasTech CBT",
    description:
      "Computer-based testing platform serving Nigerian universities",
    tags: "React · Security",
    year: "2024",
    href: "#contact",
    previewLabel: "[ oayastech cbt ]",
    previewImage: "/images/featured-projects/oayastech.png",
    aspect: "desktop",
    lightBox: {
      media: "/images/featured-projects/timeless.png",
    },
  },

  {
    index: "05",
    title: "SaukiPay",
    description: "Online payment platform for African businesses and consumers",
    tags: "Frontend",
    year: "2025—26",
    href: "#contact",
    previewLabel: "[ saukipay portfolios ]",
    previewImage: "/images/featured-projects/sauki.png",
    aspect: "mobile",
    lightBox: {
      media: "/images/featured-projects/timeless.png",
    },
  },

  {
    index: "05",
    title: "SaukiPaySSS",
    description: "Online payment platform for African businesses and consumers",
    tags: "Frontend",
    year: "2025—26",
    href: "#contact",
    previewLabel: "[ saukipay portfolios ]",
    previewImage: "/images/featured-projects/sauki.png",
    aspect: "mobile",
  },
];
