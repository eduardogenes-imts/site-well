"use client";

import { useRef } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SplitText } from "@/components/ui/split-text";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useScrollDrivenReveal } from "@/hooks/use-scroll-driven-reveal";

const faq = [
  {
    question: "What type of projects do you usually take?",
    answer:
      "Residential, hospitality, workplace and selected retail environments with strong narrative potential.",
  },
  {
    question: "Do you work with existing teams?",
    answer:
      "Yes. We frequently collaborate with local architects, consultants and contractors as an integrated design partner.",
  },
  {
    question: "How soon can a project start?",
    answer:
      "Typical onboarding happens within 2-4 weeks depending on scope and timeline complexity.",
  },
];

export default function ContactPage() {
  const rootRef = useRef<HTMLElement>(null);

  useScrollDrivenReveal(rootRef);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main
        ref={rootRef}
        className="container space-y-14 py-16 pt-24 md:space-y-20 md:py-24 md:pt-28"
      >
        <div className="grid gap-10 md:grid-cols-12">
          <div className="space-y-4 md:col-span-6">
            <p className="js-reveal text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Contact
            </p>
            <SplitText
              as="h1"
              className="text-balance text-[clamp(2rem,4.8vw,4.8rem)] font-semibold leading-[1.02] tracking-[-0.02em]"
            >
              {`Start a project\nwith Site Well`}
            </SplitText>
            <p className="js-blur-reveal max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Share context, scope and timeline. We will return with an initial
              strategy and proposed direction.
            </p>

            <div className="js-blur-reveal space-y-3 border-t border-border/70 pt-5">
              <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Studio office
              </p>
              <p className="text-sm leading-relaxed text-foreground/85">
                Level 4, 128 Flinders Lane
                <br />
                Melbourne VIC 3000
                <br />
                Australia
              </p>
              <p className="text-sm text-muted-foreground">+61 3 9000 1188</p>
            </div>
          </div>

          <form
            className="js-slide-right grid gap-4 md:col-span-6"
            aria-label="Contact form"
          >
            <Input placeholder="Your name" />
            <Input type="email" placeholder="Email" />
            <Input placeholder="Company (optional)" />
            <Input placeholder="Project type" />
            <Input placeholder="Project location" />
            <Input placeholder="Estimated budget" />
            <Input placeholder="Expected start date" />
            <Button type="submit" className="mt-2 w-fit">
              Send enquiry
            </Button>
          </form>
        </div>

        <section className="grid gap-8 border-y border-border/70 py-8 md:grid-cols-12 md:gap-8">
          <p className="js-reveal text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:col-span-2">
            Services
          </p>

          <div className="grid gap-5 md:col-span-10 md:grid-cols-2">
            <article className="js-card space-y-2">
              <h2 className="text-base font-semibold">Architecture direction</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Concept development, planning support and full design governance.
              </p>
            </article>

            <article className="js-card space-y-2">
              <h2 className="text-base font-semibold">Interior environments</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Material strategy, FF&E and experiential detail design.
              </p>
            </article>

            <article className="js-card space-y-2">
              <h2 className="text-base font-semibold">Brand-space systems</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Spatial identity and narrative coherence across touchpoints.
              </p>
            </article>

            <article className="js-card space-y-2">
              <h2 className="text-base font-semibold">Design oversight</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Supplier alignment and quality review during implementation.
              </p>
            </article>
          </div>
        </section>

        <section className="grid gap-8 md:grid-cols-12 md:gap-8">
          <p className="js-reveal text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:col-span-2">
            FAQ
          </p>

          <div className="space-y-5 md:col-span-10">
            {faq.map((item) => (
              <article
                key={item.question}
                className="js-reveal space-y-2 border-t border-border/70 pt-4"
              >
                <h3 className="text-base font-semibold">{item.question}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
