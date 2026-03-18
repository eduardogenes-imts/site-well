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