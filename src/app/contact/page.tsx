"use client";

import { useRef } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { useArchitecturalReveal } from "@/hooks/v2/use-architectural-reveal";

export default function ContactPage() {
  const rootRef = useRef<HTMLElement>(null);
  useArchitecturalReveal(rootRef);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main ref={rootRef}>
        {/* Hero */}
        <section className="flex min-h-[70vh] flex-col items-center justify-center px-8 pt-24 md:px-16 lg:px-24">
          <span
            className="reveal-illuminate text-micro uppercase tracking-[0.22em]"
            style={{ color: "hsl(var(--accent))" }}
          >
            Contato
          </span>
          <Link
            href="mailto:contato@wviana.arq.br"
            className="reveal-rise group mt-6 text-center text-architectural font-light text-foreground transition-opacity hover:opacity-60"
          >
            <span
              className="border-b pb-2 transition-colors"
              style={{ borderColor: "hsl(var(--accent) / 0.4)" }}
            >
              contato@wviana.arq.br
            </span>
          </Link>

          <div className="reveal-illuminate mt-12 flex flex-wrap justify-center gap-8">
            <span className="text-micro uppercase tracking-[0.22em]" style={{ color: "hsl(var(--accent) / 0.6)" }}>
              Brasil
            </span>
            <Link href="#" className="text-micro uppercase tracking-[0.22em] transition-opacity hover:opacity-60" style={{ color: "hsl(var(--accent) / 0.6)" }}>
              Instagram
            </Link>
            <Link href="#" className="text-micro uppercase tracking-[0.22em] transition-opacity hover:opacity-60" style={{ color: "hsl(var(--accent) / 0.6)" }}>
              Behance
            </Link>
          </div>
        </section>

        {/* Form */}
        <section className="px-8 pb-32 md:px-16 lg:px-24">
          <form
            className="mx-auto max-w-[500px] space-y-8"
            aria-label="Formulario de contato"
          >
            <FormField label="Nome" name="name" />
            <FormField label="E-mail" name="email" type="email" />
            <FormField label="Tipo de projeto" name="project-type" />
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-micro uppercase tracking-[0.22em]"
                style={{ color: "hsl(var(--accent))" }}
              >
                Mensagem
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full resize-none border-0 border-b bg-transparent pb-3 text-sm text-foreground outline-none transition-colors focus:border-foreground"
                style={{ borderColor: "hsl(var(--accent) / 0.3)" }}
              />
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 text-caption uppercase tracking-[0.18em] text-foreground transition-opacity hover:opacity-60"
            >
              Enviar
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function FormField({
  label,
  name,
  type = "text",
}: {
  label: string;
  name: string;
  type?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-micro uppercase tracking-[0.22em]"
        style={{ color: "hsl(var(--accent))" }}
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className="w-full border-0 border-b bg-transparent pb-3 text-sm text-foreground outline-none transition-colors focus:border-foreground"
        style={{ borderColor: "hsl(var(--accent) / 0.3)" }}
      />
    </div>
  );
}
