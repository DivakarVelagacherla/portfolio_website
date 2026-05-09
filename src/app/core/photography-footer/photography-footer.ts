import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollAnimateDirective } from '../../shared/directives/scroll-animate';

@Component({
  selector: 'app-photography-footer',
  imports: [RouterLink, CommonModule, ScrollAnimateDirective],
  templateUrl: './photography-footer.html',
  styleUrl: './photography-footer.css',
})
export class PhotographyFooterComponent {
  scrollTo(section: string) {
    const el = document.getElementById(section);
    if (el) {
      const headerHeight = 45; // adjust to match your header height
      const top = el.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
