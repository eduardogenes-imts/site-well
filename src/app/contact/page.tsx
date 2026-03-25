"use client";

import { FormEvent, useRef, useState } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { useArchitecturalReveal } from "@/hooks/v2/use-architectural-reveal";
import { BRAND } from "@/lib/brand";

export default function ContactPage() {
  const rootRef = useRef<HTMLElement>(null);
  const [submitState, setSubmitState] = useState<"idle" | "sent">("idle");
  useArchitecturalReveal(rootRef);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const projectType = String(data.get("project-type") || "").trim();
    const message = String(data.get("message") || "").trim();

    const text = [
      "Olá, vim pelo site da W.Viana.",
      "",
      `Nome: ${name || "-"}`,
      `E-mail: ${email || "-"}`,
      `Tipo de projeto: ${projectType || "-"}`,
      "",
      "Mensagem:",
      message || "-",
    ].join("\n");

    const whatsappLink = `https://wa.me/${BRAND.whatsappPhone}?text=${encodeURIComponent(text)}`;
    window.open(whatsappLink, "_blank", "noopener,noreferrer");

    setSubmitState("sent");
    form.reset();
  };

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
            href={`mailto:${BRAND.email}`}
            className="reveal-rise group mt-6 text-center text-architectural font-light text-foreground transition-opacity hover:opacity-60"
          >
            <span
              className="border-b pb-2 transition-colors"
              style={{ borderColor: "hsl(var(--accent) / 0.4)" }}
            >
              {BRAND.email}
            </span>
          </Link>

          <Link
            href={BRAND.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="reveal-rise mt-4 text-micro uppercase tracking-[0.22em] transition-opacity hover:opacity-60"
            style={{ color: "hsl(var(--accent))" }}
          >
            Falar no WhatsApp
          </Link>

          <div className="reveal-illuminate mt-12 flex flex-wrap justify-center gap-8">
            <span className="text-micro uppercase tracking-[0.22em]" style={{ color: "hsl(var(--accent) / 0.6)" }}>
              {BRAND.location}
            </span>
            <Link href={BRAND.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-micro uppercase tracking-[0.22em] transition-opacity hover:opacity-60" style={{ color: "hsl(var(--accent) / 0.6)" }}>
              Instagram
            </Link>
            <Link href={BRAND.pinterestUrl} target="_blank" rel="noopener noreferrer" className="text-micro uppercase tracking-[0.22em] transition-opacity hover:opacity-60" style={{ color: "hsl(var(--accent) / 0.6)" }}>
              Pinterest
            </Link>
          </div>
        </section>

        {/* Form */}
        <section className="px-8 pb-32 md:px-16 lg:px-24">
          <form
            className="mx-auto max-w-[500px] space-y-8"
            aria-label="Formulário de contato"
            onSubmit={handleSubmit}
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
                required
                className="w-full resize-none border-0 border-b bg-transparent pb-3 text-sm text-foreground outline-none transition-colors focus:border-foreground"
                style={{ borderColor: "hsl(var(--accent) / 0.3)" }}
              />
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 text-caption uppercase tracking-[0.18em] text-foreground transition-opacity hover:opacity-60"
            >
              Enviar no WhatsApp
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {submitState === "sent" ? (
              <p
                className="text-micro uppercase tracking-[0.22em]"
                style={{ color: "hsl(var(--accent))" }}
              >
                Mensagem preparada. Confira a aba do WhatsApp.
              </p>
            ) : null}
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
        required
        className="w-full border-0 border-b bg-transparent pb-3 text-sm text-foreground outline-none transition-colors focus:border-foreground"
        style={{ borderColor: "hsl(var(--accent) / 0.3)" }}
      />
    </div>
  );
}
