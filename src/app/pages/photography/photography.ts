import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { PhotographyHeroComponent } from '../../core/photography-hero-component/photography-hero-component';
import { GalleryComponent } from '../../core/gallery-component/gallery-component';
import { JourneyComponent } from '../../core/journey/journey';

@Component({
  selector: 'app-photography',
  imports: [PhotographyHeroComponent, GalleryComponent, JourneyComponent],
  templateUrl: './photography.html',
  styleUrl: './photography.css',
})
export class Photography {
  private theme = inject(ThemeService);
  constructor() {
    this.theme.pageGradient.set('linear-gradient(360deg, #ff9a6c 30%, #d46836, #de6c3a, #a6603f)');
  }
  ngOnDestroy() {
    this.theme.pageGradient.set('');
  }
}
