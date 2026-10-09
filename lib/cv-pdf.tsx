import { join } from "node:path";
import {
  Document,
  Font,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { cv, cvClients, cvProjects, linkLabel } from "@/lib/cv";

// Server-only: rendered to a PDF by app/cv/download/route.ts.

const fonts = (file: string) => join(process.cwd(), "assets/fonts", file);

Font.register({
  family: "Playfair",
  fonts: [
    { src: fonts("PlayfairDisplay-Bold.ttf"), fontWeight: 700 },
    {
      src: fonts("PlayfairDisplay-BoldItalic.ttf"),
      fontWeight: 700,
      fontStyle: "italic",
    },
  ],
});
Font.register({
  family: "DM Sans",
  fonts: [
    { src: fonts("DMSans-Regular.ttf"), fontWeight: 400 },
    { src: fonts("DMSans-Medium.ttf"), fontWeight: 500 },
    { src: fonts("DMSans-Bold.ttf"), fontWeight: 700 },
  ],
});
// The PDF keeps to a single A4 page, so it lists fewer projects than /cv.
const PDF_PROJECTS = 4;

// Don't hyphenate words across lines.
Font.registerHyphenationCallback((word) => [word]);

// Mirrors the @theme tokens in app/globals.css (react-pdf can't read CSS vars).
const C = {
  ink: "#0d0d0d",
  inkSoft: "#262626",
  mute: "#6b6b6b",
  meta: "#999999",
  line: "#e6e6e6",
  accent: "#fb5607",
};

const s = StyleSheet.create({
  page: {
    paddingTop: 32,
    paddingBottom: 34,
    paddingHorizontal: 44,
    fontFamily: "DM Sans",
    fontSize: 9,
    lineHeight: 1.45,
    color: C.inkSoft,
  },
  accentBar: { width: 28, height: 3, backgroundColor: C.accent, marginBottom: 14 },
  label: {
    fontSize: 7,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: C.meta,
  },
  name: {
    fontFamily: "Playfair",
    fontWeight: 700,
    fontSize: 34,
    lineHeight: 1,
    letterSpacing: -0.8,
    color: C.ink,
    marginTop: 6,
  },
  role: {
    fontFamily: "Playfair",
    fontWeight: 700,
    fontStyle: "italic",
    fontSize: 14,
    color: C.inkSoft,
    marginTop: 10,
  },
  availability: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
    fontSize: 9,
    fontWeight: 500,
    color: C.ink,
  },
  dot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: C.accent, marginRight: 6 },
  contact: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    fontSize: 8.5,
    color: C.mute,
  },
  contactItem: { marginRight: 14, color: C.mute, textDecoration: "none" },
  columns: { flexDirection: "row", marginTop: 18 },
  main: { flex: 1, paddingRight: 24 },
  side: { width: 150 },
  section: { marginBottom: 15 },
  sectionHead: {
    borderTopWidth: 0.75,
    borderTopColor: C.line,
    paddingTop: 7,
    marginBottom: 8,
  },
  h3: { fontFamily: "Playfair", fontWeight: 700, fontSize: 11.5, color: C.ink },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  small: { fontSize: 8, color: C.mute },
  bullet: { flexDirection: "row", marginTop: 4 },
  bulletMark: { width: 6, height: 0.75, backgroundColor: C.accent, marginTop: 6, marginRight: 6 },
  project: { marginBottom: 7 },
  link: { fontSize: 8, color: C.ink, textDecoration: "none" },
  skillGroup: { fontSize: 8.5, fontWeight: 500, color: C.ink, marginBottom: 2 },
  footer: {
    position: "absolute",
    bottom: 16,
    left: 44,
    right: 44,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 7,
    color: C.meta,
  },
});

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={s.section}>
      <View style={s.sectionHead}>
        <Text style={s.label}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

export function CvDocument() {
  return (
    <Document
      title={`${cv.name} — CV`}
      author={cv.name}
      subject={`${cv.name}, ${cv.role}`}
      creator="kwagga.dev"
    >
      <Page size="A4" style={s.page}>
        {/* Header */}
        <View style={s.accentBar} />
        <Text style={s.label}>Curriculum Vitae</Text>
        <Text style={s.name}>{cv.name}</Text>
        <Text style={s.role}>{cv.role}</Text>
        <View style={s.availability}>
          <View style={s.dot} />
          <Text>{cv.availability}</Text>
        </View>
        <View style={s.contact}>
          <Link src={`mailto:${cv.email}`} style={s.contactItem}>
            {cv.email}
          </Link>
          <Link src={cv.phone.href} style={s.contactItem}>
            {cv.phone.label}
          </Link>
          {cv.links.map((l) => (
            <Link key={l.href} src={l.href} style={s.contactItem}>
              {l.label}
            </Link>
          ))}
          <Text style={s.contactItem}>{cv.location}</Text>
        </View>

        <View style={s.columns}>
          {/* Main column */}
          <View style={s.main}>
            <Section title="Profile">
              <Text style={{ fontSize: 9.5, lineHeight: 1.5 }}>{cv.summary}</Text>
            </Section>

            <Section title="Experience">
              {cv.experience.map((job) => (
                <View key={job.role} wrap={false} style={{ marginBottom: 9 }}>
                  <View style={s.row}>
                    <Text style={s.h3}>{job.role}</Text>
                    <Text style={s.small}>{job.period}</Text>
                  </View>
                  <Text style={s.small}>{job.org}</Text>
                  {job.points.map((point) => (
                    <View key={point} style={s.bullet}>
                      <View style={s.bulletMark} />
                      <Text style={{ flex: 1 }}>{point}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </Section>

            <Section title="Selected Projects">
              {cvProjects.slice(0, PDF_PROJECTS).map((p) => {
                const label = linkLabel(p.href);
                return (
                  <View key={p.title} style={s.project} wrap={false}>
                    <View style={s.row}>
                      <Text style={[s.h3, { fontSize: 10.5 }]}>{p.title}</Text>
                      <Text style={s.small}>{p.year}</Text>
                    </View>
                    <Text style={{ color: C.mute }}>{p.description}</Text>
                    {label && (
                      <Link src={p.href} style={s.link}>
                        {label}
                      </Link>
                    )}
                  </View>
                );
              })}
              <Text style={s.small}>
                More projects at{" "}
                <Link src="https://kwagga.dev" style={{ color: C.ink, textDecoration: "none" }}>
                  kwagga.dev
                </Link>
              </Text>
            </Section>
          </View>

          {/* Side column */}
          <View style={s.side}>
            <Section title="Skills">
              {cv.skills.map((g) => (
                <View key={g.group} style={{ marginBottom: 7 }}>
                  <Text style={s.skillGroup}>{g.group}</Text>
                  {/* NBSP keeps each "·" on the same line as the item before it. */}
                  <Text style={{ color: C.mute }}>{g.items.join("\u00a0· ")}</Text>
                </View>
              ))}
            </Section>

            <Section title="Education">
              {cv.education.map((e) => (
                <View key={e.qualification}>
                  <Text style={[s.h3, { fontSize: 10.5 }]}>{e.qualification}</Text>
                  {e.institution ? <Text style={s.small}>{e.institution}</Text> : null}
                  {e.period ? <Text style={s.small}>{e.period}</Text> : null}
                </View>
              ))}
            </Section>

            <Section title="Clients">
              {cvClients.map((name) => (
                <Text key={name} style={{ color: C.mute, marginBottom: 1.5 }}>
                  {name}
                </Text>
              ))}
            </Section>
          </View>
        </View>

        <View style={s.footer} fixed>
          <Text>{cv.name} — CV</Text>
          <Link src="https://kwagga.dev/cv" style={{ color: C.meta, textDecoration: "none" }}>
            kwagga.dev/cv
          </Link>
        </View>
      </Page>
    </Document>
  );
}
