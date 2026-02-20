import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingHeader } from './shared/landing-header/landing-header';
import { TitleSection } from './core/title-section/title-section';
import { CurrentlyCard } from './shared/currently-card/currently-card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LandingHeader, TitleSection, CurrentlyCard],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
