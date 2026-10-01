import { Routes, UrlMatchResult, UrlSegment } from '@angular/router';
import { Home } from './pages/home/home';

// A single route config object matching /learn, /learn/:book, and /learn/:book/:chapter alike.
// This matters beyond routing semantics: Angular's default RouteReuseStrategy decides whether to
// reuse a component instance (vs. destroy + recreate it) by comparing route config objects with
// ===. Three separate `path: 'learn'` / `path: 'learn/:book'` / `path: 'learn/:book/:chapter'`
// entries are three different objects, so navigating between landing and a chapter would destroy
// and recreate the Learn component every time — wiping all of its state (fetched nav tree,
// animation flags) along with it. One matcher keeps it the same route, so the component instance
// — and everything it's tracking — survives navigation within /learn.
function learnMatcher(segments: UrlSegment[]): UrlMatchResult | null {
  if (segments.length === 0 || segments[0].path !== 'learn' || segments.length > 3) return null;
  const posParams: { [key: string]: UrlSegment } = {};
  if (segments[1]) posParams['book'] = segments[1];
  if (segments[2]) posParams['chapter'] = segments[2];
  return { consumed: segments, posParams };
}

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'engineering',
    loadComponent: () =>
      import('./pages/engineering/engineering').then((component) => component.Engineering),
  },
  {
    path: 'photography',
    loadComponent: () =>
      import('./pages/photography/photography').then((component) => component.Photography),
  },
  {
    matcher: learnMatcher,
    loadComponent: () => import('./pages/learn/learn').then((component) => component.Learn),
  },
  {
    path: 'blog/:slug',
    loadComponent: () =>
      import('./pages/blog-post/blog-post.page').then((c) => c.BlogPostPage),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found').then((c) => c.NotFoundComponent),
  },
];
