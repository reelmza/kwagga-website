import Nav from "@/components/Nav";
import About from "@/components/About";
import WhyMe from "@/components/WhyMe";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import Projects from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { JsonLd } from "@/components/JsonLd";
import { homeJsonLd } from "@/lib/structured-data";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full">
      <JsonLd data={homeJsonLd} />
      <Nav />
      <Hero />
      <About />
      <WhyMe />
      <Clients />
      <Projects />
      <Contact />
    </main>
  );
}
