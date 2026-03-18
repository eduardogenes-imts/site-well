import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { getAllProjects, getProjectBySlug } from "@/services/projects.service";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-5xl space-y-10 px-6 py-12 md:space-y-14 md:py-16">
      <Link
        href="/"
        className="inline-flex text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Voltar para projetos
      </Link>

      <header className="max-w-3xl space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {project.category}
        </p>
        <h1 className="text-balance text-4xl font-semibold leading-tight md:text-5xl">
          {project.title}
        </h1>
        <p className="text-lg text-muted-foreground">{project.summary}</p>
      </header>

      <Card className="overflow-hidden border-0 p-0">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={project.imageSrc}
            alt={`Capa do projeto ${project.title}`}
            fill
            sizes="(max-width: 900px) 100vw, 80vw"
            className="object-cover"
            priority
          />
        </div>
      </Card>

      <Card className="space-y-5 p-6 md:p-8" aria-label="Escopo do projeto">
        <h2 className="text-xl font-semibold md:text-2xl">Escopo</h2>
        <ul className="grid gap-3 text-muted-foreground md:grid-cols-2">
          {project.scope.map((item) => (
            <li key={item} className="list-inside list-disc">
              {item}
            </li>
          ))}
        </ul>
        <p className="text-sm uppercase tracking-[0.12em] text-muted-foreground">
          Ano: {project.year}
        </p>
      </Card>
    </main>
  );
}
