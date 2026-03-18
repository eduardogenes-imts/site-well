import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: Readonly<ProjectCardProps>) {
  return (
    <Card className="group overflow-hidden rounded-none border-x-0 border-y border-border/80 bg-transparent shadow-none">
      <Link href={`/projects/${project.slug}`} className="grid gap-4 py-5 md:grid-cols-12 md:items-end md:gap-6 md:py-7">
        <div className="relative aspect-[16/10] w-full overflow-hidden md:col-span-7">
          <Image
            src={project.imageSrc}
            alt={`Projeto ${project.title}`}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjQnIGhlaWdodD0nMTYnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHJlY3Qgd2lkdGg9JzI0JyBoZWlnaHQ9JzE2JyBmaWxsPScjMTIxMjEyJy8+PC9zdmc+"
          />
        </div>

        <div className="space-y-4 md:col-span-5 md:pb-2">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            <span>{project.typology}</span>
            <span>{project.location}</span>
            <span>{project.year}</span>
          </div>

          <h3 className="text-2xl font-semibold leading-[1.1] tracking-[-0.01em] text-card-foreground md:text-3xl">
            {project.title}
          </h3>

          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            {project.summary}
          </p>

          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-foreground/80">
            Open project
            <ArrowUpRight className="size-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </div>
      </Link>
    </Card>
  );
}
