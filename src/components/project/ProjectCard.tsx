import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: Readonly<ProjectCardProps>) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block border-b border-border/40 py-8 md:py-12"
    >
      <div className="grid gap-6 md:grid-cols-12 md:items-center md:gap-10">
        {/* Image */}
        <div className="relative aspect-[16/10] w-full overflow-hidden md:col-span-7">
          <Image
            src={project.imageSrc}
            alt={`Projeto ${project.title}`}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>

        {/* Info */}
        <div className="space-y-4 md:col-span-5">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            <span>{project.typology}</span>
            <span>{project.location}</span>
            <span>{project.year}</span>
          </div>

          <h3 className="text-[clamp(1.5rem,3vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-foreground">
            {project.title}
          </h3>

          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            {project.summary}
          </p>

          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-foreground/70 transition-colors duration-300 group-hover:text-foreground">
            Ver projeto
            <ArrowUpRight className="size-4 shrink-0 transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
