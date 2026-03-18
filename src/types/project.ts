export type Project = {
  slug: string;
  title: string;
  category: string;
  typology: "Residential" | "Hospitality" | "Workplace" | "Retail";
  status: "Completed" | "In progress";
  location: string;
  country: string;
  year: string;
  imageSrc: string;
  summary: string;
  scope: string[];
  client: string;
};