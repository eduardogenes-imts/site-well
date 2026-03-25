"use client";

import { useRef } from "react";
import Image from "next/image";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Void } from "@/components/ui/void";
import { useArchitecturalReveal } from "@/hooks/v2/use-architectural-reveal";

const capabilities = [
  "Projeto Arquitetônico",
  "Interiores & Materialidade",
  "Integração Marca-Espaço",
  "Supervisão de Obra",
];

export default function StudioPage() {
  const rootRef = useRef<HTMLElement>(null);
  useArchitecturalReveal(rootRef);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main ref={rootRef}>
        {/* 1. The Name */}
        <section className="flex h-screen flex-col items-center justify-center">
          <h1 className="reveal-rise text-monumental font-extralight uppercase text-foreground" style={{ letterSpacing: "0.15em" }}>
            W.VIANA
          </h1>
          <p className="reveal-illuminate mt-4 text-micro uppercase tracking-[0.22em]" style={{ color: "hsl(var(--accent))" }}>
            Arquitetura | Interiores / Fortaleza
          </p>
        </section>

        {/* 2. The Portrait */}
        <section className="reveal-curtain relative h-[80vh] w-full overflow-hidden">
          <Image
            src="/images/studio-portrait.jpg"
            alt="W.VIANA Estúdio"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </section>

        <Void height="15vh" />

        {/* 3. The Position */}
        <section className="px-8 py-24 md:px-16 md:py-32 lg:px-24">
          <div className="mx-auto max-w-[1800px]">
            <span className="reveal-illuminate text-micro uppercase tracking-[0.22em]" style={{ color: "hsl(var(--accent))" }}>
              Sobre
            </span>
            <p className="reveal-illuminate mt-8 max-w-[900px] text-architectural font-light leading-[1.1] text-foreground">
              Projetamos espaços atemporais com estratégia, precisão e clareza emocional.
            </p>
            <div className="mt-12 max-w-[680px] space-y-4">
              <p className="reveal-illuminate text-body-lg text-muted-foreground">
                Fundada pelo arquiteto e urbanista Wellington Viana, a W.VIANA é um
                estúdio independente que atua em arquitetura, interiores e ambientes
                de marca. Traduzimos contexto em sistemas espaciais claros que se
                sentem contemporâneos e humanos.
              </p>
              <p className="reveal-illuminate text-body-lg text-muted-foreground">
                Priorizamos contenção, detalhe e clareza acima do ruído visual. Cada
                decisão é avaliada pela função, longevidade e relevância emocional.
              </p>
            </div>
          </div>
        </section>

        <Void height="8vh" />

        {/* 4. The Numbers */}
        <section className="px-8 py-16 md:px-16 md:py-24 lg:px-24">
          <div className="mx-auto grid max-w-[1800px] gap-8 md:grid-cols-3">
            {[
              { value: "2018", label: "Fundação" },
              { value: "48+", label: "Projetos" },
              { value: "Brasil", label: "Atuação" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="reveal-rise flex flex-col items-start gap-2"
                style={{
                  borderLeft: i > 0 ? "1px solid hsl(var(--accent) / 0.2)" : "none",
                  paddingLeft: i > 0 ? "2rem" : "0",
                }}
              >
                <span
                  className="font-bold leading-none"
                  style={{
                    fontSize: "clamp(3rem, 8vw, 8rem)",
                    color: "hsl(var(--accent) / 0.2)",
                  }}
                >
                  {stat.value}
                </span>
                <span className="text-micro uppercase tracking-[0.22em] text-foreground">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        <Void height="8vh" />

        {/* 5. The Capabilities */}
        <section className="px-8 pb-32 md:px-16 lg:px-24">
          <div className="mx-auto max-w-[1800px]">
            <span className="reveal-illuminate text-micro uppercase tracking-[0.22em]" style={{ color: "hsl(var(--accent))" }}>
              Competências
            </span>
            <div className="mt-8">
              {capabilities.map((cap) => (
                <div
                  key={cap}
                  className="reveal-rise border-t py-5"
                  style={{ borderColor: "hsl(var(--accent) / 0.15)" }}
                >
                  <span className="text-body-lg text-foreground">{cap}</span>
                </div>
              ))}
              <div className="border-t" style={{ borderColor: "hsl(var(--accent) / 0.15)" }} />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
