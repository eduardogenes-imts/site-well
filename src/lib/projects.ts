export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  imageSrc: string;
  summary: string;
  scope: string[];
};

export const projects: Project[] = [
  {
    slug: "casa-aurora",
    title: "Casa Aurora",
    category: "Brand + Website",
    year: "2026",
    imageSrc: "/projects/project-01.svg",
    summary:
      "Reposicionamento completo com nova linguagem visual e narrativa digital editorial.",
    scope: ["Brand Strategy", "Art Direction", "Web Design"],
  },
  {
    slug: "verde-studio",
    title: "Verde Studio",
    category: "Direction + E-commerce",
    year: "2025",
    imageSrc: "/projects/project-02.svg",
    summary:
      "Experiência de compra com foco em ritmo visual, produto e storytelling de coleção.",
    scope: ["E-commerce UX", "Content Direction", "Design System"],
  },
  {
    slug: "nero-atelier",
    title: "Nero Atelier",
    category: "Visual System",
    year: "2025",
    imageSrc: "/projects/project-03.svg",
    summary:
      "Sistema visual modular para campanhas e desdobramentos em canais digitais.",
    scope: ["Visual Identity", "Campaign Design", "Motion Guidance"],
  },
  {
    slug: "lumen-spaces",
    title: "Lumen Spaces",
    category: "Campaign + Product",
    year: "2024",
    imageSrc: "/projects/project-04.svg",
    summary:
      "Direção de lançamento com foco em produto premium e microinterações minimalistas.",
    scope: ["Launch Campaign", "Product Story", "Experience Design"],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug) ?? null;
}
