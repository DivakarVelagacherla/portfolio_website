import { Injectable, signal } from '@angular/core';
import { Stats } from '../models/stats.model';
import { ExperienceService } from './experience';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  private statsUrl =
    'https://raw.githubusercontent.com/DivakarVelagacherla/loc-tracker/main/stats.json';

  stats = signal<Stats>({
    yearsOfExperience: 3,
    loc: 29000,
    totalCommits: 256,
    totalPrs: 45,
    totalLeetcodeSolved: 59,
    totalRepos: 19,
  });

  constructor(
    private workExperience: ExperienceService,
    private http: HttpClient,
  ) {
    this.stats.update((current) => ({
      ...current,
      yearsOfExperience: this.calculateYoe(), // ← calculate here after injection
    }));
    this.loadLiveStats();
  }

  getStats(): Stats {
    return {
      ...this.stats(),
      yearsOfExperience: this.calculateYoe(),
    };
  }

  private loadLiveStats() {
    this.fetchLiveStats().subscribe((data) => {
      this.stats.update((current) => ({
        ...current,
        loc: data.total_lines_code,
        totalCommits: data.total_commits,
        totalPrs: data.total_prs,
        totalRepos: data.total_repos,
        totalLeetcodeSolved: data.leetcode.total_solved,
        yearsOfExperience: this.calculateYoe(),
      }));
    });
  }

  fetchLiveStats() {
    return this.http.get<any>(this.statsUrl);
  }

  private calculateYoe(): number {
    const months = this.workExperience
      .getExperiences()
      .map((exp) => {
        const start = exp.startDate;
        const end = exp.endDate ? exp.endDate : new Date();
        const m =
          (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
        console.log(exp.companyName, m);
        return m;
      })
      .reduce((sum, months) => sum + months, 0);

    console.log('Total months:', months);
    return Math.floor(months / 12);
  }
}
