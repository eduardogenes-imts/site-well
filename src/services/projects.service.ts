import projectsData from "@/data/projects.json";
import type { Project } from "@/types/project";

const projects = projectsData as Project[];

export type ProjectTypology = Project["typology"];

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | null {
  return projects.find((project) => project.slug === slug) ?? null;
}

export async function fetchProjects(): Promise<Project[]> {
  return projects;
}

export function getProjectTypologies(): ProjectTypology[] {
  return Array.from(new Set(projects.map((project) => project.typology)));
}

export function getRelatedProjects(slug: string, limit = 2): Project[] {
  const current = getProjectBySlug(slug);

  if (!current) {
    return [];
  }

  const sameTypology = projects.filter(
    (project) => project.slug !== slug && project.typology === current.typology,
  );

  const fallback = projects.filter((project) => project.slug !== slug);

  const merged = [...sameTypology, ...fallback].reduce<Project[]>((acc, item) => {
    if (!acc.find((project) => project.slug === item.slug)) {
      acc.push(item);
    }

    return acc;
  }, []);

  return merged.slice(0, limit);
}

export function getNextProject(slug: string): Project | null {
  const currentIndex = projects.findIndex((project) => project.slug === slug);

  if (currentIndex < 0) {
    return null;
  }

  const nextIndex = (currentIndex + 1) % projects.length;

  return projects[nextIndex] ?? null;
}