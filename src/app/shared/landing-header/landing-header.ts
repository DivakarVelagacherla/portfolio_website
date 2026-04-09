import { Component, inject, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-landing-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './landing-header.html',
  styleUrl: './landing-header.css',
})
export class LandingHeader {
  theme = inject(ThemeService);
  @Input() logo: string = 'DV';
}
