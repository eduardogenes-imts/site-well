"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "@/lib/gsap";

type PageTransitionProps = {
  children: React.ReactNode;
};

export function PageTransition({ children }: Readonly<PageTransitionProps>) {
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const overlay = overlayRef.current;

    if (!root || !overlay) {
      return;
    }

    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

    timeline
      .fromTo(
        overlay,
        { scaleY: 1, autoAlpha: 1 },
        { scaleY: 0, autoAlpha: 0, duration: 0.85 },
      )
      .fromTo(
        root,
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.75 },
        "<0.15",
      );

    return () => {
      timeline.kill();

      gsap.set(overlay, {
        scaleY: 0,
        autoAlpha: 0,
      });

      gsap.set(root, {
        autoAlpha: 1,
        y: 0,
      });
    };
  }, [pathname]);

  return (
    <>
      <div className="page-transition-overlay" ref={overlayRef} aria-hidden="true" />
      <div className="page-transition-content" ref={rootRef}>
        {children}
      </div>
    </>
  );
}
