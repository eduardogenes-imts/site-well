"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap, { ScrollTrigger } from "@/lib/gsap";

const panels = [
  {
    number: "01",
    title: "Precisão",
    description:
      "Cada decisão é pautada pelo contexto, pela honestidade material e pela relevância a longo prazo. Buscamos clareza acima da complexidade, precisão acima da tendência.",
    image: "/images/vision-01.jpg",
  },
  {
    number: "02",
    title: "Inovação",
    description:
      "Desafiamos convenções através de pensamento estratégico, integrando tecnologias e métodos construtivos que entregam espaços que se projetam ao futuro.",
    image: "/images/vision-02.jpg",
  },
  {
    number: "03",
    title: "Experiência",
    description:
      "Arquitetura existe para elevar o cotidiano. Nosso trabalho prioriza conforto, atmosfera e a experiência humana em cada escala.",
    image: "/images/vision-03.jpg",
  },
];

export function VisionHorizontalSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const totalScroll = track.scrollWidth - window.innerWidth;

        const hScroll = gsap.to(track, {
          x: -totalScroll,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${totalScroll}`,
            scrub: 1,
            pin: true,
            pinType: "transform",
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Reveal each panel content using containerAnimation
        const mainST = hScroll.scrollTrigger;
        if (mainST) {
          track.querySelectorAll<HTMLElement>(".vision-panel").forEach((panel) => {
            gsap.fromTo(
              panel.querySelectorAll(".vp-reveal"),
              { autoAlpha: 0, y: 40 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.12,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: hScroll,
                  start: "left 70%",
                  once: true,
                },
              },
            );
          });
        }

        ScrollTrigger.refresh();

        // Signal that the pin is ready so downstream sections can register
        window.dispatchEvent(new CustomEvent("vision-pin-ready"));
      }, section);

      // Store context for cleanup
      (section as HTMLElement & { _gsapCtx?: gsap.Context })._gsapCtx = ctx;
    }, 100);

    return () => {
      clearTimeout(timer);
      const ctx = (section as HTMLElement & { _gsapCtx?: gsap.Context })._gsapCtx;
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-section="vision"
      className="relative z-[30] bg-foreground text-white"
    >
      {/* Section label bar */}
      <div className="absolute left-0 right-0 top-0 z-10 flex items-center gap-4 px-6 py-6 md:px-10 lg:px-14">
        <span className="text-[11px] uppercase tracking-[0.2em] text-white/50">03</span>
        <div className="h-px flex-1 bg-white/20" />
        <span className="text-[11px] uppercase tracking-[0.2em] text-white/50">Visão</span>
      </div>

      {/* Horizontal track */}
      <div ref={trackRef} className="flex h-screen w-fit overflow-hidden">
        {panels.map((panel, i) => (
          <div
            key={panel.number}
            className="vision-panel relative flex h-full w-screen flex-shrink-0 items-center"
          >
            {/* Background image */}
            <div className="absolute inset-0">
              <Image
                src={panel.image}
                alt={panel.title}
                fill
                sizes="100vw"
                className="object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-foreground/60" />
            </div>

            {/* Panel content */}
            <div className="relative z-10 grid h-full w-full grid-cols-1 items-center gap-8 px-6 md:grid-cols-2 md:gap-16 md:px-20 lg:px-28">
              <div>
                <p className="vp-reveal text-[10px] uppercase tracking-[0.3em] text-white/40">
                  {panel.number}
                </p>
                <h3 className="vp-reveal mt-4 text-[clamp(2.5rem,5vw,5rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
                  {panel.title}
                </h3>
              </div>
              <div>
                <p className="vp-reveal max-w-md text-base leading-relaxed text-white/70 md:text-lg">
                  {panel.description}
                </p>
              </div>
            </div>

            {/* Panel divider */}
            {i < panels.length - 1 && (
              <div className="absolute right-0 top-[20%] h-[60%] w-px bg-white/10" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
