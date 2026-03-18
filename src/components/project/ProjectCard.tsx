import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: Readonly<ProjectCardProps>) {
  return (
    <Card className="group overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/projects/${project.slug}`} className="block">
        <CardContent className="p-0">
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <Image
              src={project.imageSrc}
              alt={`Projeto ${project.title}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjQnIGhlaWdodD0nMTYnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHJlY3Qgd2lkdGg9JzI0JyBoZWlnaHQ9JzE2JyBmaWxsPScjMTIxMjEyJy8+PC9zdmc+"
            />
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between gap-4 p-5">
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              {project.category}
            </p>
            <h3 className="text-lg font-semibold leading-snug text-card-foreground">
              {project.title}
            </h3>
            <p className="text-xs uppercase tracking-[0.1em] text-muted-foreground">
              {project.year}
            </p>
          </div>
          <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
        </CardFooter>
      </Link>
    </Card>
  );
}
