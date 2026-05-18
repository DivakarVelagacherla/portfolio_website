import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

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
    path: 'learn',
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
