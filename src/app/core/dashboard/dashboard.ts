import { Component, effect, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Stats } from '../../models/stats.model';
import { StatsService } from '../../services/stats';
import { animateCounter } from '../../utils/count-animation.utils';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements AfterViewInit {
  @ViewChild('yoeEl') yoeEl!: ElementRef;
  @ViewChild('totalReposEl') totalReposEl!: ElementRef;
  @ViewChild('totalCommitsEl') totalCommitsEl!: ElementRef;
  @ViewChild('totalPrsEl') totalPrsEl!: ElementRef;
  @ViewChild('totalLeetcodeEl') totalLeetcodeEl!: ElementRef;

  constructor(public statsService: StatsService) {
    effect(() => {
      const stats = this.statsService.stats();
      if (this.yoeEl) {
        animateCounter(stats.yearsOfExperience, this.yoeEl.nativeElement, 1000);
        animateCounter(stats.totalRepos, this.totalReposEl.nativeElement, 1000);
        animateCounter(stats.totalCommits, this.totalCommitsEl.nativeElement, 1000);
        animateCounter(stats.totalPrs, this.totalPrsEl.nativeElement, 1000);
        animateCounter(stats.totalLeetcodeSolved, this.totalLeetcodeEl.nativeElement, 1000);
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const stats = this.statsService.stats();
      animateCounter(stats.yearsOfExperience, this.yoeEl.nativeElement, 1000);
      animateCounter(stats.totalRepos, this.totalReposEl.nativeElement, 1000);
      animateCounter(stats.totalCommits, this.totalCommitsEl.nativeElement, 1000);
      animateCounter(stats.totalPrs, this.totalPrsEl.nativeElement, 1000);
      animateCounter(stats.totalLeetcodeSolved, this.totalLeetcodeEl.nativeElement, 1000);
    }, 100);
  }
}
