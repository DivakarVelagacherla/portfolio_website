import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingHeader } from './shared/landing-header/landing-header';
import { TitleSection } from './core/title-section/title-section';
import { CurrentlyCard } from './shared/currently-card/currently-card';
import { QuoteSection } from './core/quote-section/quote-section';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LandingHeader, TitleSection, CurrentlyCard, QuoteSection],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
