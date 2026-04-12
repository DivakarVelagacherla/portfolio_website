import { Component, OnInit } from '@angular/core';
import { Stats } from '../../models/stats.model';
import { StatsService } from '../../services/stats';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  stats: Stats | null = null;

  constructor(private statsService: StatsService) {}

  ngOnInit(): void {
    this.stats = this.statsService.getStats();
  }
}
