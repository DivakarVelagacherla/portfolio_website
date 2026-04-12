export interface Education {
  id: number;
  degree: string;
  universityName: string;
  startDate: Date;
  endDate: Date | null;
  location: string;
}
