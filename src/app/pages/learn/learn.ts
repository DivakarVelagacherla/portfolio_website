import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { LearningService, slugify } from '../../services/learning';
import { LearningNode } from '../../models/learning.model';
import { ThemeService } from '../../services/theme.service';

const PAGE_GRADIENT = 'linear-gradient(360deg, #2cd1d1 30%, #2AA8A8, #1da3a3, #1bcaca)';

function firstLeaf(node: LearningNode): LearningNode | null {
  if (node.path) return node;
  for (const child of node.children ?? []) {
    const found = firstLeaf(child);
    if (found) return found;
  }
  return null;
}

function findLeafBySlug(node: LearningNode, slug: string): LearningNode | null {
  if (node.path && node.slug === slug) return node;
  for (const child of node.children ?? []) {
    const found = findLeafBySlug(child, slug);
    if (found) return found;
  }
  return null;
}

function expandPathTo(node: LearningNode, slug: string): boolean {
  if (node.path && node.slug === slug) return true;
  for (const child of node.children ?? []) {
    if (expandPathTo(child, slug)) {
      node.expanded = true;
      return true;
    }
  }
  return false;
}

interface OnThisPageEntry {
  id: string;
  text: string;
}

@Component({
  selector: 'app-learn',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './learn.html',
  styleUrl: './learn.css',
})
export class Learn implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('articleBody') articleBody?: ElementRef<HTMLElement>;

  nav: LearningNode[] = [];
  currentBook: LearningNode | null = null;
  currentChapter: LearningNode | null = null;
  chapterHtml = '';
  onThisPage: OnThisPageEntry[] = [];
  sidebarCollapsed = false;
  navLoading = true;
  navError = false;
  contentLoading = true;

  private destroyRef = inject(DestroyRef);
  private theme = inject(ThemeService);
  private title = inject(Title);
  private meta = inject(Meta);
  private resizeHandler = () => this.measureHeaderHeights();
  private scrollHandler = () => this.updateScrollProgress();
  private headerResizeObserver?: ResizeObserver;

  constructor(
    private learningService: LearningService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    this.title.setTitle('Learning — Divakar Velagacherla');
    this.meta.updateTag({
      name: 'description',
      content: 'Notes and books on Java, Spring Boot, and system design.',
    });
    this.theme.pageGradient.set(PAGE_GRADIENT);
    this.theme.pageHeaderTitle.set('Learning');
  }

  ngOnInit(): void {
    this.learningService
      .getNavigation()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (nav) => {
          this.nav = nav;
          this.navLoading = false;

          this.route.paramMap
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((params) => {
              this.applyRoute(params.get('book'), params.get('chapter'));
            });

          this.cdr.detectChanges();
        },
        error: () => {
          this.navLoading = false;
          this.navError = true;
          this.cdr.detectChanges();
        },
      });
  }

  ngAfterViewInit(): void {
    this.measureHeaderHeights();
    this.updateScrollProgress();

    this.headerResizeObserver = new ResizeObserver(() => this.measureHeaderHeights());
    const headerStack = document.querySelector('.sticky-header-stack');
    if (headerStack) this.headerResizeObserver.observe(headerStack);

    window.addEventListener('resize', this.resizeHandler);
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
  }

  ngOnDestroy(): void {
    this.theme.pageGradient.set('');
    this.theme.readingProgress.set(null);
    this.theme.pageHeaderTitle.set(null);
    this.headerResizeObserver?.disconnect();
    window.removeEventListener('resize', this.resizeHandler);
    window.removeEventListener('scroll', this.scrollHandler);
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  toggleNode(node: LearningNode): void {
    node.expanded = !node.expanded;
  }

  scrollToHeading(id: string, event: Event): void {
    event.preventDefault();
    const container = this.articleBody?.nativeElement;
    const target = container?.querySelector(`#${CSS.escape(id)}`);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  private updateScrollProgress(): void {
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - doc.clientHeight;
    const progress = scrollable > 0 ? (doc.scrollTop / scrollable) * 100 : 0;
    this.theme.readingProgress.set(progress);
  }

  private measureHeaderHeights(): void {
    const headerStack = document.querySelector('.sticky-header-stack') as HTMLElement | null;
    // Round up (never down) so the sidebar/rail never start a hair too early and reveal
    // scrolled content behind the sticky header stack.
    const height = Math.ceil(headerStack?.getBoundingClientRect().height ?? 0);
    document.documentElement.style.setProperty('--learn-header-offset', `${height}px`);
  }

  private applyRoute(bookParam: string | null, chapterParam: string | null): void {
    const book = (bookParam && this.nav.find((b) => b.slug === bookParam)) || this.nav[0];
    if (!book) {
      this.navError = true;
      return;
    }
    this.currentBook = book;

    const chapter =
      (chapterParam && findLeafBySlug(book, chapterParam)) || firstLeaf(book);
    if (!chapter) {
      this.navError = true;
      return;
    }

    for (const b of this.nav) b.expanded = b === book;
    expandPathTo(book, chapter.slug);

    if (bookParam !== book.slug || chapterParam !== chapter.slug) {
      this.router.navigate(['/learn', book.slug, chapter.slug], { replaceUrl: true });
    }

    if (chapter === this.currentChapter) return;
    this.currentChapter = chapter;
    this.theme.pageHeaderTitle.set(chapter.title);
    this.loadChapterContent(chapter);
  }

  private loadChapterContent(chapter: LearningNode): void {
    this.contentLoading = true;
    this.chapterHtml = '';
    this.onThisPage = [];
    this.learningService
      .getChapterHtml(chapter.path!)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (html) => {
          this.chapterHtml = html;
          this.contentLoading = false;
          this.cdr.detectChanges();
          window.scrollTo({ top: 0 });
          setTimeout(() => {
            this.buildOnThisPage();
            this.measureHeaderHeights();
            this.updateScrollProgress();
          });
        },
        error: () => {
          this.contentLoading = false;
          this.cdr.detectChanges();
        },
      });
  }

  private buildOnThisPage(): void {
    const container = this.articleBody?.nativeElement;
    if (!container) return;

    const headings = Array.from(container.querySelectorAll('h2'));
    this.onThisPage = headings.map((heading, index) => {
      const text = heading.textContent?.trim() || `Section ${index + 1}`;
      const id = slugify(text) || `section-${index}`;
      heading.id = id;
      return { id, text };
    });
    this.cdr.detectChanges();
  }
}
