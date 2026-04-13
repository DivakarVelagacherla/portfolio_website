import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Stats } from '../../models/stats.model';
import { StatsService } from '../../services/stats';
import { animateCounter } from '../../utils/count-animation.utils';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit, AfterViewInit {
  stats: Stats | null = null;

  @ViewChild('yoeEl') yoeEl!: ElementRef;
  @ViewChild('totalReposEl') totalReposEl!: ElementRef;
  @ViewChild('totalCommitsEl') totalCommitsEl!: ElementRef;
  @ViewChild('totalPrsEl') totalPrsEl!: ElementRef;
  @ViewChild('totalLeetcodeEl') totalLeetcodeEl!: ElementRef;

  constructor(private statsService: StatsService) {}

  ngOnInit(): void {
    this.stats = this.statsService.getStats();
  }

  ngAfterViewInit(): void {
    if (this.stats) {
      animateCounter(this.stats.yearsOfExperience, this.yoeEl.nativeElement, 1000);
      animateCounter(this.stats.totalRepos, this.totalReposEl.nativeElement, 1000);
      animateCounter(this.stats.totalCommits, this.totalCommitsEl.nativeElement, 1000);
      animateCounter(this.stats.totalPrs, this.totalPrsEl.nativeElement, 1000);
      animateCounter(this.stats.totalLeetcodeSolved, this.totalLeetcodeEl.nativeElement, 1000);
    }
  }
}
