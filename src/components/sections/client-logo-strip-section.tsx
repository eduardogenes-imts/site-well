"use client";

import { useRef } from "react";
import { useScrollDrivenReveal } from "@/hooks/use-scroll-driven-reveal";

const clientNames = [
  "AURORA GROUP",
  "NERO ATELIER",
  "LUMEN SPACES",
  "VERDE STUDIO",
  "KINETIC HOTELS",
  "NOVA CAPITAL",
];

export function ClientLogoStripSection() {
  const rootRef = useRef<HTMLElement>(null);

  useScrollDrivenReveal(rootRef);

  return (
    <section
      ref={rootRef}
      className="container space-y-5 border-y border-border/70 py-8 md:py-10"
    >
      <p className="js-reveal text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        Trusted by clients across residential, hospitality and workplace
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {clientNames.map((client) => (
          <div
            key={client}
            className="js-card flex min-h-12 items-center justify-center border border-border/70 px-3 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground"
          >
            {client}
          </div>
        ))}
      </div>
    </section>
  );
}
