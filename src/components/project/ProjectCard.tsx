import Image from "next/image";
import Link from "next/link";

type ProjectCardProps = {
  slug: string;
  title: string;
  category: string;
  year: string;
  imageSrc: string;
};

export function ProjectCard({
  slug,
  title,
  category,
  year,
  imageSrc,
}: Readonly<ProjectCardProps>) {
  return (
    <article className="project-card js-card">
      <Link href={`/projects/${slug}`} className="project-card__media">
        <Image
          src={imageSrc}
          alt={`Projeto ${title}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="project-card__image"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjQnIGhlaWdodD0nMTYnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHJlY3Qgd2lkdGg9JzI0JyBoZWlnaHQ9JzE2JyBmaWxsPScjMTIxMjEyJy8+PC9zdmc+"
        />
        <div className="project-card__overlay" />
      </Link>

      <div className="project-card__meta">
        <p className="project-card__category">{category}</p>
        <h2 className="project-card__title">
          <Link href={`/projects/${slug}`}>{title}</Link>
        </h2>
        <p className="project-card__year">{year}</p>
      </div>
    </article>
  );
}
