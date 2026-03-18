import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { WorksSection } from "@/components/sections/works-section";

export default function WorksPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-20 md:pt-24">
        <WorksSection />
      </main>
      <SiteFooter />
    </div>
  );
}
