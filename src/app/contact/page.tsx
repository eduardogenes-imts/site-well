import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="container py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="space-y-4 md:col-span-6">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Contact</p>
            <h1 className="text-balance text-[clamp(2rem,4.8vw,4.8rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
              Start a project with Site Well
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Share context, scope and timeline. We will return with an initial strategy and proposed direction.
            </p>
          </div>

          <form className="grid gap-4 md:col-span-6" aria-label="Contact form">
            <Input placeholder="Your name" />
            <Input type="email" placeholder="Email" />
            <Input placeholder="Project type" />
            <Input placeholder="Estimated budget" />
            <Button type="submit" className="mt-2 w-fit">
              Send enquiry
            </Button>
          </form>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
