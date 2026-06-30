import Nav from "@/components/Nav";
import About from "@/components/About";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import Projects from "@/components/Projects";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full">
      <Nav />
      <Hero />
      <About />
      <Clients />
      <Projects />
      <Contact />
    </main>
  );
}
