"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "@/lib/gsap";

const galleryItems = [
  { src: "/images/gallery-01.jpg", alt: "Project 1", w: "w-[45%] md:w-[28%]", pos: "top-[5%] left-[3%]", speed: 0.6 },
  { src: "/images/gallery-02.jpg", alt: "Project 2", w: "w-[38%] md:w-[22%]", pos: "top-[8%] right-[8%]", speed: 1.0 },
  { src: "/images/gallery-03.jpg", alt: "Project 3", w: "w-[42%] md:w-[26%]", pos: "top-[32%] left-[12%]", speed: 0.4 },
  { src: "/images/gallery-04.jpg", alt: "Project 4", w: "w-[50%] md:w-[30%]", pos: "top-[38%] right-[3%]", speed: 0.8 },
  { src: "/images/gallery-05.jpg", alt: "Project 5", w: "w-[40%] md:w-[24%]", pos: "top-[62%] left-[5%]", speed: 1.2 },
  { src: "/images/gallery-06.jpg", alt: "Project 6", w: "w-[44%] md:w-[27%]", pos: "top-[65%] right-[10%]", speed: 0.5 },
];

export function OrganicGallerySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Each image: scale reveal + parallax at different speeds
      const images = section.querySelectorAll<HTMLElement>(".og-item");
      images.forEach((img) => {
        const speed = parseFloat(img.dataset.speed || "0.5");

        // Scale in on enter
        gsap.fromTo(
          img,
          { scale: 0, autoAlpha: 0 },
          {
            scale: 1,
            autoAlpha: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: img, start: "top 92%", once: true },
          },
        );

        // Parallax at varying speeds
        gsap.to(img, {
          yPercent: -30 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });

      // Center text reveal
      const centerText = section.querySelector<HTMLElement>(".og-center-text");
      if (centerText) {
        gsap.fromTo(
          centerText,
          { autoAlpha: 0, scale: 0.9 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: centerText, start: "top 80%", once: true },
          },
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-section="gallery"
      className="relative bg-white py-10"
      style={{ minHeight: "120vh" }}
    >
      <div className="relative mx-auto max-w-[1800px]" style={{ height: "100vh" }}>
        {/* Organic positioned images */}
        {galleryItems.map((item, i) => (
          <div
            key={i}
            className={`og-item absolute ${item.w} ${item.pos}`}
            data-speed={item.speed}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 50vw, 30vw"
                className="object-cover"
              />
            </div>
          </div>
        ))}

        {/* Center text */}
        <div className="og-center-text absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center">
          <p className="text-[clamp(3rem,8vw,9rem)] font-bold leading-none tracking-[-0.04em] text-foreground">
            All Work
          </p>
          <p className="mt-2 text-[clamp(2rem,5vw,6rem)] font-light tracking-[-0.02em] text-foreground/60">
            ({galleryItems.length})
          </p>
        </div>
      </div>
    </section>
  );
}
