export interface Stats {
  yearsOfExperience: number;
  loc: number;
  totalCommits: number;
  totalPrs: number;
  totalLeetcodeSolved: number;

  //   loc by language for future
  locByLanguage?: {
    [language: string]: number;
  };
}
