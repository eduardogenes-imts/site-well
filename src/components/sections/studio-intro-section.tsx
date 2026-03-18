"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "@/lib/gsap";

export function StudioIntroSection() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // Label + text fade in
      gsap.utils.toArray<HTMLElement>(".si-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          },
        );
      });

      // Giant headline — line-by-line scrub reveal
      const headlineLines = root.querySelectorAll<HTMLElement>(".si-headline-line");
      headlineLines.forEach((line, i) => {
        gsap.fromTo(
          line,
          { yPercent: 100, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root.querySelector(".si-headline"),
              start: `top+=${i * 40} 85%`,
              end: `top+=${i * 40 + 120} 50%`,
              scrub: 0.8,
            },
          },
        );
      });

      // Portrait image reveal
      const img = root.querySelector<HTMLElement>(".si-image");
      if (img) {
        gsap.fromTo(
          img,
          { clipPath: "inset(20% 0% 20% 0%)", autoAlpha: 0 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            autoAlpha: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: img, start: "top 85%", once: true },
          },
        );
      }
    }, root);

    return () => ctx.revert();
  }, []);

  const headlineText =
    "W.VIANA Arquitetura e Interiores. Sete anos de expertise em soluções personalizadas que elevam experiências.";
  const words = headlineText.split(" ");
  const chunkSize = Math.ceil(words.length / 3);
  const lines = [
    words.slice(0, chunkSize).join(" "),
    words.slice(chunkSize, chunkSize * 2).join(" "),
    words.slice(chunkSize * 2).join(" "),
  ];

  return (
    <section
      ref={rootRef}
      data-section="studio"
      className="relative bg-white py-20 md:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[1800px] px-6 md:px-10 lg:px-14">
        {/* Top: image left + label right */}
        <div className="grid gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5 lg:col-span-4">
            <div className="si-image relative aspect-[3/4] w-full overflow-hidden">
              <Image
                src="/images/studio-portrait.jpg"
                alt="Wellington Viana — W.VIANA Arquitetura"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col justify-end md:col-span-7 lg:col-span-8">
            <p className="si-reveal text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              01 Estúdio
            </p>
            <p className="si-reveal mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
              Fundada pelo arquiteto e urbanista Wellington Viana, a W.VIANA
              entrega arquiteturas inovadoras e assertivas, unindo criatividade e
              funcionalidade para criar espaços transformadores.
            </p>
          </div>
        </div>

        {/* Giant headline full-width */}
        <div className="si-headline mt-16 md:mt-24">
          {lines.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <p className="si-headline-line text-[clamp(2rem,6.5vw,7rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground">
                {line}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
