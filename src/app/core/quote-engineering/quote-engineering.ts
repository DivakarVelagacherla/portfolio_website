import { Component, ElementRef, ViewChild, effect, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animateCounter } from '../../utils/count-animation.utils';
import { StatsService } from '../../services/stats';

@Component({
  selector: 'app-quote-engineering',
  imports: [CommonModule],
  templateUrl: './quote-engineering.html',
  styleUrl: './quote-engineering.css',
})
export class QuoteEngineering implements AfterViewInit {
  @ViewChild('locEl') locEl!: ElementRef;

  constructor(public statsService: StatsService) {
    effect(() => {
      const loc = this.statsService.stats().loc;
      if (this.locEl) {
        animateCounter(loc, this.locEl.nativeElement, 1500);
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const loc = this.statsService.stats().loc;
      animateCounter(loc, this.locEl.nativeElement, 1500);
    }, 100);
  }
}
