"use client";

import Image from "next/image";
import type { Project } from "@/types/project";

type ProjectCoverProps = {
  project: Project;
};

export function ProjectCover({ project }: ProjectCoverProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Image
        src={project.imageSrc}
        alt={`Capa do projeto ${project.title}`}
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />

      {/* Title overlay — bottom left */}
      <div className="absolute inset-x-0 bottom-0 px-8 pb-12 md:px-16 md:pb-16 lg:px-24">
        <h1
          className="text-monumental font-semibold text-white"
          style={{ textShadow: "0 2px 40px rgba(0,0,0,0.3)" }}
        >
          {project.title}
        </h1>
      </div>

      {/* Year — bottom right */}
      <span
        className="absolute bottom-12 right-8 text-micro uppercase tracking-[0.22em] text-white/70 md:bottom-16 md:right-16 lg:right-24"
      >
        {project.year}
      </span>
    </section>
  );
}
