"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "@/services/projects.service";

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    staleTime: 1000 * 60 * 5,
  });
}