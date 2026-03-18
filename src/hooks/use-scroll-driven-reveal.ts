"use client";

import { useLayoutEffect, type RefObject } from "react";
import gsap, { ScrollTrigger } from "@/lib/gsap";

type ScrollDrivenOptions = {
  revealSelector?: string;
  cardSelector?: string;
  parallaxSelector?: string;
  parallaxImageSelector?: string;
  scrubTitleSelector?: string;
  imageRevealSelector?: string;
  blurRevealSelector?: string;
  scaleRevealSelector?: string;
  slideLeftSelector?: string;
  slideRightSelector?: string;
  lineRevealSelector?: string;
  scrollScaleSelector?: string;
  sectionFadeSelector?: string;
};

const defaults: Required<ScrollDrivenOptions> = {
  revealSelector: ".js-reveal",
  cardSelector: ".js-card",
  parallaxSelector: ".js-parallax-media",
  parallaxImageSelector: ".js-parallax-image",
  scrubTitleSelector: ".js-scrub-title",
  imageRevealSelector: ".js-image-reveal",
  blurRevealSelector: ".js-blur-reveal",
  scaleRevealSelector: ".js-scale-reveal",
  slideLeftSelector: ".js-slide-left",
  slideRightSelector: ".js-slide-right",
  lineRevealSelector: ".js-line-reveal",
  scrollScaleSelector: ".js-scroll-scale",
  sectionFadeSelector: ".js-section-fade",
};

export function useScrollDrivenReveal(
  rootRef: RefObject<HTMLElement | null>,
  dependencyKey = "",
  options: ScrollDrivenOptions = {},
) {
  const config = { ...defaults, ...options };

  useLayoutEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const context = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [
            config.revealSelector,
            config.cardSelector,
            config.blurRevealSelector,
            config.scaleRevealSelector,
            config.slideLeftSelector,
            config.slideRightSelector,
            config.scrollScaleSelector,
          ].join(", "),
          { autoAlpha: 1, y: 0, x: 0, scale: 1, filter: "blur(0px)" },
        );
        gsap.set(".js-split-line", { yPercent: 0 });
        return;
      }

      // ── Reveal (fade + translateY) ──
      const revealItems = gsap.utils.toArray<HTMLElement>(config.revealSelector);
      revealItems.forEach((item) => {
        gsap.fromTo(
          item,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 86%", once: true },
          },
        );
      });

      // ── Card stagger ──
      const cards = gsap.utils.toArray<HTMLElement>(config.cardSelector);
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { autoAlpha: 0, y: 42 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.11,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cards[0]?.parentElement ?? root,
              start: "top 82%",
              once: true,
            },
          },
        );
      }

      // ── Image clip-path reveal ──
      const imageReveals = gsap.utils.toArray<HTMLElement>(config.imageRevealSelector);
      imageReveals.forEach((item) => {
        gsap.fromTo(
          item,
          { clipPath: "inset(18% 0% 18% 0%)", autoAlpha: 0 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            autoAlpha: 1,
            duration: 1.15,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 84%", once: true },
          },
        );
      });

      // ── Scrub titles ──
      const scrubTitles = gsap.utils.toArray<HTMLElement>(config.scrubTitleSelector);
      scrubTitles.forEach((title) => {
        gsap.fromTo(
          title,
          { yPercent: 0, autoAlpha: 1 },
          {
            yPercent: -22,
            autoAlpha: 0.4,
            ease: "none",
            scrollTrigger: {
              trigger: title,
              start: "top 72%",
              end: "bottom 30%",
              scrub: 0.8,
            },
          },
        );
      });

      // ── Parallax media ──
      const mediaBlocks = gsap.utils.toArray<HTMLElement>(config.parallaxSelector);
      mediaBlocks.forEach((block) => {
        const image = block.querySelector<HTMLElement>(config.parallaxImageSelector);
        if (!image) return;

        gsap.fromTo(
          image,
          { yPercent: -11, scale: 1.06 },
          {
            yPercent: 11,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: block,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.3,
            },
          },
        );
      });

      // ── Blur reveal (fade + blur + translateY) ──
      const blurItems = gsap.utils.toArray<HTMLElement>(config.blurRevealSelector);
      blurItems.forEach((item) => {
        gsap.fromTo(
          item,
          { autoAlpha: 0, y: 30, filter: "blur(10px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 88%", once: true },
          },
        );
      });

      // ── Scale reveal ──
      const scaleItems = gsap.utils.toArray<HTMLElement>(config.scaleRevealSelector);
      scaleItems.forEach((item) => {
        gsap.fromTo(
          item,
          { autoAlpha: 0, scale: 0.92 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 86%", once: true },
          },
        );
      });

      // ── Slide from left ──
      const slideLeftItems = gsap.utils.toArray<HTMLElement>(config.slideLeftSelector);
      slideLeftItems.forEach((item) => {
        gsap.fromTo(
          item,
          { autoAlpha: 0, x: -60 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 86%", once: true },
          },
        );
      });

      // ── Slide from right ──
      const slideRightItems = gsap.utils.toArray<HTMLElement>(config.slideRightSelector);
      slideRightItems.forEach((item) => {
        gsap.fromTo(
          item,
          { autoAlpha: 0, x: 60 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 86%", once: true },
          },
        );
      });

      // ── Line-by-line reveal (SplitText lines) ──
      const lineRevealBlocks = gsap.utils.toArray<HTMLElement>(config.lineRevealSelector);
      lineRevealBlocks.forEach((block) => {
        const lines = block.querySelectorAll<HTMLElement>(".js-split-line");
        if (lines.length === 0) return;

        gsap.fromTo(
          lines,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 1.2,
            stagger: 0.08,
            ease: "expo.out",
            scrollTrigger: { trigger: block, start: "top 86%", once: true },
          },
        );
      });

      // ── Scroll-linked scale (images grow on scroll) ──
      const scrollScaleItems = gsap.utils.toArray<HTMLElement>(config.scrollScaleSelector);
      scrollScaleItems.forEach((item) => {
        gsap.fromTo(
          item,
          { scale: 0.85, autoAlpha: 0.6 },
          {
            scale: 1,
            autoAlpha: 1,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              end: "top 20%",
              scrub: 1.2,
            },
          },
        );
      });

      // ── Section fade-out (scrollytelling) ──
      const sectionFadeItems = gsap.utils.toArray<HTMLElement>(config.sectionFadeSelector);
      sectionFadeItems.forEach((section) => {
        gsap.fromTo(
          section,
          { autoAlpha: 1, y: 0 },
          {
            autoAlpha: 0.3,
            y: -30,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "bottom 80%",
              end: "bottom 20%",
              scrub: 0.6,
            },
          },
        );
      });

      ScrollTrigger.refresh();
    }, root);

    return () => {
      context.revert();
    };
  }, [
    rootRef,
    config.cardSelector,
    config.parallaxImageSelector,
    config.parallaxSelector,
    config.scrubTitleSelector,
    config.imageRevealSelector,
    config.revealSelector,
    config.blurRevealSelector,
    config.scaleRevealSelector,
    config.slideLeftSelector,
    config.slideRightSelector,
    config.lineRevealSelector,
    config.scrollScaleSelector,
    config.sectionFadeSelector,
    dependencyKey,
  ]);
}
