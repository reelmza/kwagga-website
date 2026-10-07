import { cv } from "@/lib/cv";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

// schema.org JSON-LD, rendered by <JsonLd>. Built from lib/cv.ts so search
// engines see the same facts as the CV.

const PERSON_ID = `${SITE_URL}/#person`;

const person = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: cv.name,
  url: SITE_URL,
  jobTitle: cv.role,
  description: cv.summary,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Abuja",
    addressCountry: "NG",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Bingham University",
  },
  knowsAbout: cv.skills.flatMap((s) => s.items),
  sameAs: [
    "https://github.com/reelmza",
    "https://linkedin.com/in/moseskwagga",
    "https://x.com/moseskwagga",
  ],
};

export const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "en",
      author: { "@id": PERSON_ID },
    },
    person,
  ],
};

export const cvJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: `${SITE_URL}/cv`,
  name: `${cv.name} — CV`,
  mainEntity: person,
};
