import { Component, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { TitleSection } from '../../shared/title-section/title-section';
import { QuoteSection } from '../../core/quote-section/quote-section';
import { CurrentlyCard } from '../../shared/currently-card/currently-card';
import { CtaSection } from '../../shared/cta-section/cta-section';
import { LocationsComponent } from '../../core/locations-component/locations-component';

@Component({
  selector: 'app-home',
  imports: [TitleSection, QuoteSection, CurrentlyCard, CtaSection, LocationsComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private title = inject(Title);
  private meta = inject(Meta);

  constructor() {
    this.title.setTitle('Divakar Velagacherla — Software Engineer & Photographer');
    this.meta.updateTag({ name: 'description', content: 'Software Engineer. Java, Spring Boot, AWS. Photography portfolio. India · USA.' });
  }
}
