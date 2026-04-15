export interface BlogPost {
  title: string;
  date: Date;
  slug: string;
  categories: string[];
  summary: string;
  readTime: number;
  content?: string;
}
