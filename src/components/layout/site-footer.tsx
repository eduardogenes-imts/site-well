"use client";

import Link from "next/link";

export function SiteFooter() {
  return (
    <footer>
      {/* Moment 1: The Invitation */}
      <section
        className="relative flex min-h-screen flex-col items-center justify-center bg-foreground px-8 md:px-16 lg:px-24"
        data-theme="dark"
      >
        <p
          className="text-micro uppercase tracking-[0.22em]"
          style={{ color: "hsl(var(--accent))" }}
        >
          Proximo passo
        </p>
        <h2 className="mt-6 text-center text-monumental font-light text-white">
          Vamos conversar.
        </h2>
        <Link
          href="mailto:contato@wviana.arq.br"
          className="group mt-8 text-center text-architectural font-light text-white/80 transition-colors hover:text-white"
        >
          <span className="border-b border-[hsl(var(--accent)/0.4)] pb-2 transition-all group-hover:border-[hsl(var(--accent))]">
            contato@wviana.arq.br
          </span>
        </Link>
      </section>

      {/* Moment 2: The Colophon */}
      <section className="bg-foreground">
        <div
          className="mx-auto flex max-w-[1800px] flex-col gap-4 border-t px-8 py-6 md:flex-row md:items-center md:justify-between md:px-16 lg:px-24"
          style={{ borderColor: "hsl(var(--accent) / 0.15)" }}
        >
          <span
            className="text-micro uppercase tracking-[0.22em]"
            style={{ color: "hsl(var(--accent))" }}
          >
            W.VIANA
          </span>
          <span
            className="text-micro uppercase tracking-[0.22em]"
            style={{ color: "hsl(var(--accent) / 0.5)" }}
          >
            Brasil / SP
          </span>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-micro uppercase tracking-[0.22em] transition-opacity hover:opacity-60"
              style={{ color: "hsl(var(--accent) / 0.5)" }}
            >
              Instagram
            </Link>
            <Link
              href="#"
              className="text-micro uppercase tracking-[0.22em] transition-opacity hover:opacity-60"
              style={{ color: "hsl(var(--accent) / 0.5)" }}
            >
              Behance
            </Link>
          </div>
        </div>
      </section>

      {/* Moment 3: The Mark */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden bg-foreground pb-6 pt-8">
        <span
          className="select-none font-bold leading-none text-white/[0.03]"
          style={{ fontSize: "30vw", letterSpacing: "0.15em" }}
        >
          W.
        </span>
        <div className="mt-4 flex flex-col items-center gap-1">
          <p
            className="text-micro uppercase tracking-[0.22em]"
            style={{ color: "hsl(var(--accent) / 0.4)" }}
          >
            &copy; 2026 W.VIANA Arquitetura e Interiores
          </p>
          <p
            className="text-micro uppercase tracking-[0.22em]"
            style={{ color: "hsl(var(--accent) / 0.25)" }}
          >
            Site por IMTS
          </p>
        </div>
      </section>
    </footer>
  );
}
