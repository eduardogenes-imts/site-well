import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { HeroSection } from "@/components/sections/hero-section";
import { StudioIntroSection } from "@/components/sections/studio-intro-section";
import { VisionHorizontalSection } from "@/components/sections/vision-horizontal-section";
import { OrganicGallerySection } from "@/components/sections/organic-gallery-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { FloatingCta } from "@/components/ui/floating-cta";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <HeroSection />
        <StudioIntroSection />
        <VisionHorizontalSection />
        <OrganicGallerySection />
        <ProjectsSection />
      </main>
      <SiteFooter />
      <FloatingCta />
    </div>
  );
}
