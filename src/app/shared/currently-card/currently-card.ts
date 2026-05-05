import { Component, OnInit, effect } from '@angular/core';
import { StatsService } from '../../services/stats';

@Component({
  selector: 'app-currently-card',
  imports: [],
  templateUrl: './currently-card.html',
  styleUrl: './currently-card.css',
})
export class CurrentlyCard {
  width: number = 0;

  constructor(public statsService: StatsService) {
    effect(() => {
      const problemsSolved = this.statsService.stats().totalLeetcodeSolved;
      this.width = (problemsSolved / 300) * 100;
    });
  }
}
