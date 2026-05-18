import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
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
export class Home implements OnInit, OnDestroy {
  private title = inject(Title);
  private meta = inject(Meta);
  private document = inject(DOCUMENT);
  private ldScript: HTMLScriptElement | null = null;

  constructor() {
    this.title.setTitle('Divakar Velagacherla — Software Engineer & Photographer');
    this.meta.updateTag({ name: 'description', content: 'Software Engineer. Java, Spring Boot, AWS. Photography portfolio. India · USA.' });
  }

  ngOnInit(): void {
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      'name': 'Divakar Velagacherla',
      'url': 'https://divakarvelagacherla.com',
      'jobTitle': 'Software Engineer',
      'sameAs': [
        'https://linkedin.com/in/divakarvelagacherla',
        'https://github.com/divakarvelagacherla',
        'https://instagram.com/divakar_velagacherla',
      ],
    });
    this.document.head.appendChild(script);
    this.ldScript = script;
  }

  ngOnDestroy(): void {
    this.ldScript?.remove();
  }
}
