export interface WorkExperience {
  id: number;
  role: string;
  companyName: string;
  startDate: Date;
  endDate: Date | null;
  location: string;
  techStack: string[];
  description: string;
  companyUrl?: string;
}
