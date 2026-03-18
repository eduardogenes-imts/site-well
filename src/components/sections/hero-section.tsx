"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "@/lib/gsap";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    if (!section || !image || !content) return;

    const ctx = gsap.context(() => {
      // Parallax: image moves slower than scroll
      gsap.to(image, {
        yPercent: 25,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Fade out + scale down hero content on scroll
      gsap.to(content, {
        autoAlpha: 0,
        scale: 0.95,
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-section="hero"
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background image with parallax */}
      <div ref={imageRef} className="absolute inset-0 -top-[10%] -bottom-[10%]">
        <Image
          src="/images/hero-bg.jpg"
          alt="W.VIANA Arquitetura e Interiores"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content overlay */}
      <div ref={contentRef} className="relative flex h-full flex-col justify-end px-6 pb-12 md:px-10 md:pb-16 lg:px-14">
        <div className="mx-auto flex w-full max-w-[1800px] items-end justify-between">
          {/* Bottom-left: scroll indicator */}
          <p className="text-[11px] uppercase tracking-[0.24em] text-white/70">
            [ Descubra ]
          </p>

          {/* Bottom-right: tagline */}
          <p className="max-w-md text-right text-sm leading-relaxed text-white/90 md:text-base lg:text-lg">
            Criatividade e funcionalidade
            <br />
            para espaços que elevam
            <br />
            experiências e expectativas.
          </p>
        </div>
      </div>
    </section>
  );
}
