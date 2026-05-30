import { Component, OnDestroy, AfterViewInit, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TitleSection } from '../../shared/title-section/title-section';
import { ThemeService } from '../../services/theme.service';
import { QuoteEngineering } from '../../core/quote-engineering/quote-engineering';
import { EngineeringSummary } from '../../core/engineering-summary/engineering-summary';
import { Dashboard } from '../../core/dashboard/dashboard';
import { Button } from '../../shared/button/button';
import { TechStack } from '../../core/tech-stack/tech-stack';
import { WorkExperience } from '../../core/work-experience/work-experience';
import { EducationComponent } from '../../core/education-component/education-component';
import { BlogPostsComponent } from '../../core/blog-post-component/blog-posts-component';
import { CertificationsComponent } from '../../core/certifications-component/certifications-component';
import { Footer } from '../../core/footer/footer';

@Component({
  selector: 'app-engineering',
  imports: [
    TitleSection,
    QuoteEngineering,
    EngineeringSummary,
    Dashboard,
    Button,
    TechStack,
    WorkExperience,
    EducationComponent,
    CertificationsComponent,
    BlogPostsComponent,
    Footer,
  ],
  templateUrl: './engineering.html',
  styleUrl: './engineering.css',
})
export class Engineering implements AfterViewInit, OnDestroy {
  private title = inject(Title);
  private meta = inject(Meta);
  private theme = inject(ThemeService);
  private route = inject(ActivatedRoute);

  constructor() {
    this.title.setTitle('Engineering — Divakar Velagacherla');
    this.meta.updateTag({ name: 'description', content: 'Java, Spring Boot, AWS engineer. Angular portfolio with live GitHub stats and blog posts.' });
    this.theme.pageGradient.set(
      'linear-gradient(360deg, oklch(0.77 0.09 240.14) 30%, #028cdf, #1b8fe7, #5bb5cf)',
    );
  }

  ngAfterViewInit(): void {
    const anchor = this.route.snapshot.queryParamMap.get('scrollTo');
    if (anchor) {
      setTimeout(() => {
        document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }

  ngOnDestroy() {
    this.theme.pageGradient.set('');
  }
}
