import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ClientLogoStripSection } from "@/components/sections/client-logo-strip-section";
import { FeaturedCaseStudiesSection } from "@/components/sections/featured-case-studies-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ManifestoSection } from "@/components/sections/manifesto-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { StudioIntroSection } from "@/components/sections/studio-intro-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-20 md:pt-24">
        <HeroSection />
        <StudioIntroSection />
        <ClientLogoStripSection />
        <ProjectsSection />
        <ManifestoSection />
        <FeaturedCaseStudiesSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
