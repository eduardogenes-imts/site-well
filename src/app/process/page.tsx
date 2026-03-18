import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function ProcessPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="container space-y-6 py-16 md:py-24">
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Process</p>
        <h1 className="max-w-4xl text-balance text-[clamp(2rem,4.8vw,4.8rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
          Context. Strategy. Materiality. Execution.
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Process page is active and ready for full chapter structure in the next implementation stage.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
