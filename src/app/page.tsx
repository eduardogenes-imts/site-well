import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { StudioIntroSection } from "@/components/sections/studio-intro-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <HeroSection />
        <StudioIntroSection />
        <ProjectsSection />
      </main>
      <SiteFooter />
    </div>
  );
}
