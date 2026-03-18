"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "@/lib/gsap";

const INTRO_KEY = "wviana:intro-played";

export function GlobalIntroLoader() {
  const [isVisible, setIsVisible] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLSpanElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wasPlayed = sessionStorage.getItem(INTRO_KEY) === "true";

    if (reducedMotion || wasPlayed) {
      return;
    }

    const overlay = overlayRef.current;
    const logo = logoRef.current;
    const counter = counterRef.current;

    if (!overlay || !logo || !counter) {
      return;
    }

    const rafId = window.requestAnimationFrame(() => {
      setIsVisible(true);
    });

    const progress = { value: 0 };

    const timeline = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        sessionStorage.setItem(INTRO_KEY, "true");
        setIsVisible(false);
      },
    });

    timeline
      // Step 1: Logo appears with fade + subtle scale
      .fromTo(
        logo,
        { autoAlpha: 0, scale: 0.92, filter: "blur(4px)" },
        { autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 0.7, ease: "power2.out" },
      )
      // Step 2: Progress counter animates
      .to(
        progress,
        {
          value: 100,
          duration: 1.4,
          ease: "power2.out",
          onUpdate: () => {
            counter.textContent = `${Math.round(progress.value)}%`;
          },
        },
        "-=0.3",
      )
      // Step 3: Counter and logo fade out upward
      .to(
        [logo, counter],
        { autoAlpha: 0, y: -16, duration: 0.35, stagger: 0.06 },
        "-=0.2",
      )
      // Step 4: Overlay exits with scaleY
      .to(
        overlay,
        {
          scaleY: 0,
          transformOrigin: "top",
          duration: 0.9,
          ease: "power4.inOut",
        },
        "-=0.1",
      );

    return () => {
      window.cancelAnimationFrame(rafId);
      timeline.kill();
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      className="intro-loader-overlay"
      aria-hidden="true"
    >
      <span ref={logoRef} className="intro-loader-logo">
        W.VIANA
      </span>
      <p className="intro-loader-label">Arquitetura | Interiores</p>
      <span ref={counterRef} className="intro-loader-progress">
        0%
      </span>
    </div>
  );
}
