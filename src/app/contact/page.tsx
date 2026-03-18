"use client";

import { useRef } from "react";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useScrollDrivenReveal } from "@/hooks/use-scroll-driven-reveal";

const faq = [
  {
    question: "Que tipo de projetos vocês aceitam?",
    answer:
      "Residencial, comercial, hospitalidade e corporativo — ambientes com forte potencial narrativo e impacto transformador.",
  },
  {
    question: "Vocês trabalham com equipes existentes?",
    answer:
      "Sim. Colaboramos frequentemente com arquitetos locais, consultores e construtoras como parceiro integrado de design.",
  },
  {
    question: "Em quanto tempo um projeto pode começar?",
    answer:
      "O onboarding típico acontece em 2-4 semanas, dependendo do escopo e complexidade do cronograma.",
  },
];

export default function ContactPage() {
  const rootRef = useRef<HTMLElement>(null);
  useScrollDrivenReveal(rootRef);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main ref={rootRef}>
        {/* Hero + Form */}
        <section className="mx-auto max-w-[1800px] px-6 pt-28 pb-16 md:px-10 md:pt-36 md:pb-24 lg:px-14">
          <div className="grid gap-12 md:grid-cols-12">
            {/* Left: Info */}
            <div className="space-y-6 md:col-span-6">
              <p className="js-reveal text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Contato
              </p>
              <h1 className="js-reveal text-[clamp(2rem,5vw,4.8rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
                Inicie um projeto com a W.VIANA
              </h1>
              <p className="js-reveal max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                Compartilhe contexto, escopo e cronograma. Retornaremos com uma
                estratégia inicial e direção proposta.
              </p>

              <div className="js-reveal space-y-4 border-t border-border/40 pt-6">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    E-mail
                  </p>
                  <Link
                    href="mailto:contato@wviana.arq.br"
                    className="text-sm text-foreground transition-colors hover:text-foreground/60"
                  >
                    contato@wviana.arq.br
                  </Link>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    Localização
                  </p>
                  <p className="text-sm text-foreground">Brasil</p>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    Redes
                  </p>
                  <div className="flex gap-4">
                    <Link href="#" className="text-sm text-foreground transition-colors hover:text-foreground/60">
                      Instagram
                    </Link>
                    <Link href="#" className="text-sm text-foreground transition-colors hover:text-foreground/60">
                      Behance
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <form
              className="js-reveal grid gap-4 md:col-span-6"
              aria-label="Formulário de contato"
            >
              <Input placeholder="Seu nome" />
              <Input type="email" placeholder="E-mail" />
              <Input placeholder="Empresa (opcional)" />
              <Input placeholder="Tipo de projeto" />
              <Input placeholder="Localização do projeto" />
              <Input placeholder="Orçamento estimado" />
              <Input placeholder="Data prevista de início" />
              <Button type="submit" className="mt-2 w-fit">
                Enviar consulta
              </Button>
            </form>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-[1800px] px-6 pb-20 md:px-10 md:pb-28 lg:px-14">
          <div className="grid gap-8 md:grid-cols-12 md:gap-10">
            <p className="js-reveal text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:col-span-2">
              Perguntas frequentes
            </p>
            <div className="space-y-0 md:col-span-10">
              {faq.map((item) => (
                <article
                  key={item.question}
                  className="js-reveal space-y-2 border-t border-border/40 py-6"
                >
                  <h3 className="text-base font-semibold">{item.question}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.answer}
                  </p>
                </article>
              ))}
              <div className="border-t border-border/40" />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
