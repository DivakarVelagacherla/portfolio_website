export interface Education {
  id: number;
  degree: string;
  stream: string;
  universityName: string;
  startDate: Date;
  endDate: Date | null;
  location: string;
}
