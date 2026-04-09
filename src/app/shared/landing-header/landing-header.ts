import { Component, inject } from '@angular/core';
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
}
