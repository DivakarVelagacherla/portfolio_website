import { Injectable } from '@angular/core';
import { Stats } from '../models/stats.model';
import { ExperienceService } from './experience';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  constructor(private workExperience: ExperienceService) {}

  private stats: Stats = {
    yearsOfExperience: 5,
    loc: 29000,
    totalCommits: 256,
    totalPrs: 45,
    totalLeetcodeSolved: 59,
  };

  getStats(): Stats {
    return {
      ...this.stats,
      yearsOfExperience: this.calculateYoe(),
    };
  }

  private calculateYoe(): number {
    const totalMonths = this.workExperience
      .getExperiences()
      .map((exp) => {
        const start = exp.startDate;
        const end = exp.endDate ? exp.endDate : new Date();
        return (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
      })
      .reduce((sum, months) => sum + months, 0);

    return Math.floor(totalMonths / 12);
  }
}
