export interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  tags: string[];
  features: string[];
  platforms?: string[];
  posters?: string[];
}
