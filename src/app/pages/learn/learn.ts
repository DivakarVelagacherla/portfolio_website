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
const TRANSITION_MS = 500;

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

function countLeaves(node: LearningNode): number {
  if (node.path) return 1;
  return (node.children ?? []).reduce((sum, child) => sum + countLeaves(child), 0);
}

interface OnThisPageEntry {
  id: string;
  text: string;
}

interface BookSummary {
  node: LearningNode;
  chapterCount: number;
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
  bookSummaries: BookSummary[] = [];
  viewState: 'landing' | 'reader' = 'landing';
  sequencePhase: 'blank' | 'title' | 'subtitle' | 'badge' | 'final' = 'blank';
  landingLeaving = false;
  readerEntering = false;
  landingInstant = false;
  private initialRouteHandled = false;
  private sequenceTimers: ReturnType<typeof setTimeout>[] = [];
  private skipNextLandingSequence = false;

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
    this.theme.pageHeaderTitle.set(null);
  }

  ngOnInit(): void {
    this.learningService
      .getNavigation()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (nav) => {
          this.nav = nav;
          this.bookSummaries = nav.map((node) => ({ node, chapterCount: countLeaves(node) }));
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
    this.clearSequenceTimers();
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

  startReading(bookSlug?: string): void {
    const slug = bookSlug ?? this.nav[0]?.slug;
    if (!slug) return;
    this.router.navigate(['/learn', slug]);
  }

  backToOverview(): void {
    this.readerEntering = false;
    this.theme.pageHeaderTitle.set(null);
    this.skipNextLandingSequence = true;
    setTimeout(() => {
      this.router.navigate(['/learn']);
    }, TRANSITION_MS);
  }

  private runLandingSequence(): void {
    this.clearSequenceTimers();
    this.sequencePhase = 'blank';

    const BLANK_MS = 400;
    const SOLO_MS = 4200;
    const BADGE_MS = 2600;

    this.sequenceTimers.push(
      setTimeout(() => {
        this.sequencePhase = 'title';
        this.cdr.detectChanges();
      }, BLANK_MS),
    );
    this.sequenceTimers.push(
      setTimeout(() => {
        this.sequencePhase = 'subtitle';
        this.cdr.detectChanges();
      }, BLANK_MS + SOLO_MS),
    );
    this.sequenceTimers.push(
      setTimeout(() => {
        this.sequencePhase = 'badge';
        this.cdr.detectChanges();
      }, BLANK_MS + SOLO_MS * 2),
    );
    this.sequenceTimers.push(
      setTimeout(() => {
        this.transitionBadgeToFinal();
      }, BLANK_MS + SOLO_MS * 2 + BADGE_MS),
    );
  }

  /**
   * The "LEARNING" badge is shown centered alone (sequencePhase 'badge'), then needs to glide
   * into its resting place at the top of the final composed layout without ever disappearing.
   * Classic FLIP: measure its position before the phase swap, let Angular render the final
   * layout (where the badge already sits in its natural resting spot), measure again, then
   * apply the inverse offset and transition it back to zero so the browser animates the move.
   */
  private transitionBadgeToFinal(): void {
    const oldBadge = document.querySelector('.sequence-badge') as HTMLElement | null;
    const oldRect = oldBadge?.getBoundingClientRect();

    this.sequencePhase = 'final';
    this.cdr.detectChanges();

    requestAnimationFrame(() => {
      const newBadge = document.querySelector('.landing-eyebrow') as HTMLElement | null;
      if (oldRect && newBadge) {
        const newRect = newBadge.getBoundingClientRect();
        const deltaX = oldRect.left + oldRect.width / 2 - (newRect.left + newRect.width / 2);
        const deltaY = oldRect.top - newRect.top;

        newBadge.style.transition = 'none';
        newBadge.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        newBadge.getBoundingClientRect(); // force reflow so the jump above applies instantly

        requestAnimationFrame(() => {
          newBadge.style.transition = 'transform 2s cubic-bezier(0.16, 1, 0.3, 1)';
          newBadge.style.transform = 'translate(0, 0)';
        });
      }
      this.cdr.detectChanges();
    });
  }

  private clearSequenceTimers(): void {
    this.sequenceTimers.forEach((timer) => clearTimeout(timer));
    this.sequenceTimers = [];
  }

  private enterReaderView(): void {
    if (this.viewState === 'reader' || this.landingLeaving) return;
    this.clearSequenceTimers();
    this.landingInstant = false;
    this.landingLeaving = true;
    this.cdr.detectChanges();
    setTimeout(() => {
      this.viewState = 'reader';
      this.cdr.detectChanges();
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          this.readerEntering = true;
          this.cdr.detectChanges();
        }),
      );
    }, TRANSITION_MS);
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
    const isInitialLoad = !this.initialRouteHandled;
    this.initialRouteHandled = true;

    if (!bookParam && !chapterParam) {
      this.viewState = 'landing';
      this.landingLeaving = false;
      this.readerEntering = false;
      this.theme.pageHeaderTitle.set(null);

      if (this.skipNextLandingSequence) {
        this.skipNextLandingSequence = false;
        this.clearSequenceTimers();
        this.landingInstant = true;
        this.sequencePhase = 'final';
      } else {
        this.landingInstant = false;
        this.runLandingSequence();
      }
      this.cdr.detectChanges();
      return;
    }

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

    if (isInitialLoad) {
      // Direct/shared link straight to a chapter — skip the landing screen and its
      // transition entirely rather than flashing it before fading to the reader.
      this.viewState = 'reader';
      this.readerEntering = true;
    } else {
      this.enterReaderView();
    }
    this.cdr.detectChanges();

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
