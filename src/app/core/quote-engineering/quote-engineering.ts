import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animateCounter } from '../../utils/count-animation.utils';

@Component({
  selector: 'app-quote-engineering',
  imports: [CommonModule],
  templateUrl: './quote-engineering.html',
  styleUrl: './quote-engineering.css',
})
export class QuoteEngineering implements AfterViewInit {
  loc: number = 28909;

  @ViewChild('locEl') locEl!: ElementRef;

  ngAfterViewInit(): void {
    animateCounter(this.loc, this.locEl.nativeElement, 1500);
  }
}
