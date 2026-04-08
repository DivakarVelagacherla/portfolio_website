import { Component } from '@angular/core';
import { TitleSection } from '../../shared/title-section/title-section';
import { QuoteSection } from '../../core/quote-section/quote-section';
import { CurrentlyCard } from '../../shared/currently-card/currently-card';
import { CtaSection } from '../../shared/cta-section/cta-section';

@Component({
  selector: 'app-home',
  imports: [TitleSection, QuoteSection, CurrentlyCard, CtaSection],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
