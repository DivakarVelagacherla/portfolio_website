import { Component, OnDestroy, inject } from '@angular/core';
import { TitleSection } from '../../shared/title-section/title-section';
import { ThemeService } from '../../shared/theme.service';
import { QuoteEngineering } from '../../core/quote-engineering/quote-engineering';
import { EngineeringSummary } from '../../core/engineering-summary/engineering-summary';
import { Dashboard } from '../../core/dashboard/dashboard';

@Component({
  selector: 'app-engineering',
  imports: [TitleSection, QuoteEngineering, EngineeringSummary, Dashboard],
  templateUrl: './engineering.html',
  styleUrl: './engineering.css',
})
export class Engineering implements OnDestroy {
  private theme = inject(ThemeService);

  constructor() {
    this.theme.pageGradient.set(
      'linear-gradient(360deg, oklch(0.77 0.09 240.14) 30%, #028cdf, #1b8fe7, #5bb5cf)',
    );
  }

  ngOnDestroy() {
    this.theme.pageGradient.set('');
  }
}
