"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "@/lib/gsap";

const services = [
  { number: "(01)", name: "Projeto Arquitetônico" },
  { number: "(02)", name: "Design de Interiores" },
  { number: "(03)", name: "Desenvolvimento & Planejamento Urbano" },
  { number: "(04)", name: "Design de Desenvolvimento" },
  { number: "(05)", name: "Marketing & Design de Interiores" },
  { number: "(06)", name: "Documentação Construtiva" },
  { number: "(07)", name: "Administração de Obra" },
];

export function MethodSection() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const initAnimations = () => {
      const ctx = gsap.context(() => {
        // Service items staggered reveal
        const items = root.querySelectorAll<HTMLElement>(".method-item");
        items.forEach((item, i) => {
          gsap.fromTo(
            item,
            { autoAlpha: 0, y: 30 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              delay: i * 0.05,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 90%",
                once: true,
              },
            },
          );
        });

        // Image reveal
        const img = root.querySelector<HTMLElement>(".method-image");
        if (img) {
          gsap.fromTo(
            img,
            { clipPath: "inset(15% 0% 15% 0%)", autoAlpha: 0 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              autoAlpha: 1,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: { trigger: img, start: "top 85%", once: true },
            },
          );
        }

        // Label reveal
        const label = root.querySelector<HTMLElement>(".method-label");
        if (label) {
          gsap.fromTo(
            label,
            { autoAlpha: 0, y: 20 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: { trigger: label, start: "top 90%", once: true },
            },
          );
        }
      }, root);

      (root as HTMLElement & { _gsapCtx?: gsap.Context })._gsapCtx = ctx;
    };

    window.addEventListener("vision-pin-ready", initAnimations, { once: true });
    const fallback = setTimeout(initAnimations, 300);

    return () => {
      window.removeEventListener("vision-pin-ready", initAnimations);
      clearTimeout(fallback);
      const ctx = (root as HTMLElement & { _gsapCtx?: gsap.Context })._gsapCtx;
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      data-section="method"
      className="relative bg-white"
    >
      <div className="mx-auto max-w-[1800px] grid md:grid-cols-12 gap-8 px-6 py-20 md:px-10 md:py-28 lg:px-14 lg:py-36">
        {/* Left: Services list */}
        <div className="md:col-span-7 lg:col-span-8">
          <div className="method-label">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Método
            </p>
          </div>

          <div className="mt-10 space-y-0">
            {services.map((service) => (
              <div
                key={service.number}
                className="method-item border-b border-border/30 py-3 md:py-4"
              >
                <p className="text-[clamp(1.2rem,3.5vw,3.2rem)] font-light leading-[1.15] tracking-[-0.02em] text-foreground">
                  {service.name}{" "}
                  <span className="text-[0.5em] align-super text-foreground/40">
                    {service.number}
                  </span>
                </p>
              </div>
            ))}
          </div>

          <div className="method-label mt-10 max-w-lg">
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              Nosso estúdio cobre todas as etapas da Arquitetura e Design de
              Interiores. Oferecemos um serviço completo, dos conceitos iniciais
              à conclusão prática.
            </p>
          </div>
        </div>

        {/* Right: Image */}
        <div className="md:col-span-5 lg:col-span-4">
          <div className="method-image relative aspect-[3/4] w-full overflow-hidden">
            <Image
              src="/images/vision-03.jpg"
              alt="W.VIANA Método"
              fill
              sizes="(max-width: 768px) 100vw, 35vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
