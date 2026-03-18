import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/lib/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="project-page">
      <Link href="/" className="project-page__back">
        Voltar para projetos
      </Link>

      <header className="project-page__header">
        <p className="project-page__category">{project.category}</p>
        <h1 className="project-page__title">{project.title}</h1>
        <p className="project-page__summary">{project.summary}</p>
      </header>

      <div className="project-page__cover">
        <Image
          src={project.imageSrc}
          alt={`Capa do projeto ${project.title}`}
          fill
          sizes="(max-width: 900px) 100vw, 80vw"
          className="project-page__image"
          priority
        />
      </div>

      <section className="project-page__details" aria-label="Escopo do projeto">
        <h2 className="project-page__subtitle">Escopo</h2>
        <ul className="project-page__scope">
          {project.scope.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="project-page__year">Ano: {project.year}</p>
      </section>
    </main>
  );
}
