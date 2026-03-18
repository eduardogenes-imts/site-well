import {
  getAllProjects,
  getProjectBySlug as getProjectBySlugFromService,
} from "@/services/projects.service";
import type { Project } from "@/types/project";

export type { Project };

export const projects: Project[] = getAllProjects();

export function getProjectBySlug(slug: string) {
  return getProjectBySlugFromService(slug);
}
