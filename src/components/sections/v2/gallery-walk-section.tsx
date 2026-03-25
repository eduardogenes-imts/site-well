"use client";

import { useRef } from "react";
import { getAllProjects } from "@/services/projects.service";
import { GalleryProjectCard } from "@/components/project/v2/gallery-project-card";
import { Void } from "@/components/ui/void";
import { useArchitecturalReveal } from "@/hooks/v2/use-architectural-reveal";

export function GalleryWalkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const projects = getAllProjects();

  useArchitecturalReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="bg-background px-8 py-24 md:px-16 md:py-32 lg:px-24 lg:py-48"
    >
      <div className="mx-auto max-w-[1800px]">
        {projects.map((project, i) => (
          <div key={project.slug}>
            <GalleryProjectCard project={project} index={i} />
            {i < projects.length - 1 && <Void height="12vh" />}
          </div>
        ))}
      </div>
    </section>
  );
}
