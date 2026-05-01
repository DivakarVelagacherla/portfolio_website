import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { DarkModeService } from '../../services/dark-mode-service';

@Component({
  selector: 'app-landing-header',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './landing-header.html',
  styleUrl: './landing-header.css',
})
export class LandingHeader {
  theme = inject(ThemeService);
  isMenuOpen: boolean = false;

  darkMode = inject(DarkModeService);

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
