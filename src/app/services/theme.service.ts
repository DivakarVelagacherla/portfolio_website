import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  pageGradient = signal('');
  /** 0-100 reading progress shown as a fill under the global header. Null hides it. */
  readingProgress = signal<number | null>(null);
  /** Optional second header row rendered directly below the global nav. Null hides it. */
  pageHeaderTitle = signal<string | null>(null);
}
