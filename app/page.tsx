import { ContactForm } from "@/components/sections/ContactForm";
import { EngineeringCapabilities } from "@/components/sections/EngineeringCapabilities";
import { Footer } from "@/components/sections/Footer";
import { Gateways } from "@/components/sections/Gateways";
import { Hero } from "@/components/sections/Hero";
import { LeadGen } from "@/components/sections/LeadGen";
import { MarketsServed } from "@/components/sections/MarketsServed";
import { Navbar } from "@/components/sections/Navbar";
import { Projects } from "@/components/sections/Projects";
import { RegionalPresence } from "@/components/sections/RegionalPresence";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { SteelAlliance } from "@/components/sections/SteelAlliance";
import { Stats } from "@/components/sections/Stats";
import { FloatingCTA } from "@/components/ui/FloatingCTA";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <FloatingCTA />
      <main id="main-content" className="flex-1">
        <Hero />

        <SplitFeature
          id="solutions"
          eyebrow="Turnkey Expertise"
          title="Silo-Based Turnkey Projects"
          image="/images/steel-silo.jpg"
          imageAlt="Square-silo steel structure under construction"
          body={
            <>
              <p>
                BRIAM Asia represents the brands of the BRIAM Group and brings more
                than 35 years of experience in the realisation of state-of-the-art,
                square-silo based projects for the feed and food industry.
              </p>
              <p>
                From turnkey projects to a square-silo product supplier — explore
                which BRIAM brand best fits your needs.
              </p>
            </>
          }
          cta={{ label: "Explore Solutions", href: "#gateways" }}
        />

        <EngineeringCapabilities />
        <Gateways />
        <SteelAlliance />
        <Stats />
        <RegionalPresence />
        <MarketsServed />
        <LeadGen />
        <Projects />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
