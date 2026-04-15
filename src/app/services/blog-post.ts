import { Injectable } from '@angular/core';
import { BlogPost } from '../models/blog-post.model';

@Injectable({
  providedIn: 'root',
})
export class BlogPostsService {
  private blogPosts: BlogPost[] = [
    {
      title: 'Why Most Software is Overengineered',
      slug: 'why-most-software-is-overengineered',
      date: new Date('2026-04-06'),
      categories: ['Software Architecture'],
      readTime: 4,
      summary:
        'The dangerous default of building for 10x scale on day one — and why the engineers I trust most push back on unnecessary complexity before a single line of code is written.',
    },
    {
      title: 'The API Contract Nobody Talks About',
      slug: 'api-contract-nobody-talks-about',
      date: new Date('2026-03-20'),
      categories: ['Backend', 'API Design'],
      readTime: 5,
      summary:
        "Every API is a promise. Breaking that promise — even with good intentions — is how distributed systems fail silently. Here's what I've learned designing APIs that teams actually trust.",
    },
    {
      title: 'Why I Stopped Chasing New Frameworks',
      slug: 'stopped-chasing-new-frameworks',
      date: new Date('2026-03-01'),
      categories: ['Engineering Mindset', 'Career'],
      readTime: 3,
      summary:
        "There's always a new framework promising to solve everything. After years of chasing them, I realized the engineers who understand fundamentals deeply always outlast the ones who chase trends.",
    },
    {
      title: 'Why Most Software is Overengineered',
      slug: 'why-most-software-is-overengineered',
      date: new Date('2026-04-06'),
      categories: ['Engineering Mindset'],
      readTime: 4,
      summary:
        'The dangerous default of building for 10x scale on day one — and why the engineers I trust most push back on unnecessary complexity before a single line of code is written.',
    },
    {
      title: 'The API Contract Nobody Talks About',
      slug: 'api-contract-nobody-talks-about',
      date: new Date('2026-03-20'),
      categories: ['Backend', 'API Design'],
      readTime: 5,
      summary:
        "Every API is a promise. Breaking that promise — even with good intentions — is how distributed systems fail silently. Here's what I've learned designing APIs that teams actually trust.",
    },
    {
      title: 'Why I Stopped Chasing New Frameworks',
      slug: 'stopped-chasing-new-frameworks',
      date: new Date('2026-03-01'),
      categories: ['Engineering Mindset', 'Career'],
      readTime: 3,
      summary:
        "There's always a new framework promising to solve everything. After years of chasing them, I realized the engineers who understand fundamentals deeply always outlast the ones who chase trends.",
    },
    {
      title: 'Why Most Software is Overengineered',
      slug: 'why-most-software-is-overengineered',
      date: new Date('2026-04-06'),
      categories: ['Engineering Mindset'],
      readTime: 4,
      summary:
        'The dangerous default of building for 10x scale on day one — and why the engineers I trust most push back on unnecessary complexity before a single line of code is written.',
    },
    {
      title: 'The API Contract Nobody Talks About',
      slug: 'api-contract-nobody-talks-about',
      date: new Date('2026-03-20'),
      categories: ['Backend', 'API Design'],
      readTime: 5,
      summary:
        "Every API is a promise. Breaking that promise — even with good intentions — is how distributed systems fail silently. Here's what I've learned designing APIs that teams actually trust.",
    },
    {
      title: 'Why I Stopped Chasing New Frameworks',
      slug: 'stopped-chasing-new-frameworks',
      date: new Date('2026-03-01'),
      categories: ['Engineering Mindset', 'Career'],
      readTime: 3,
      summary:
        "There's always a new framework promising to solve everything. After years of chasing them, I realized the engineers who understand fundamentals deeply always outlast the ones who chase trends.",
    },
    {
      title: 'Why Most Software is Overengineered',
      slug: 'why-most-software-is-overengineered',
      date: new Date('2026-04-06'),
      categories: ['Engineering Mindset'],
      readTime: 4,
      summary:
        'The dangerous default of building for 10x scale on day one — and why the engineers I trust most push back on unnecessary complexity before a single line of code is written.',
    },
    {
      title: 'The API Contract Nobody Talks About',
      slug: 'api-contract-nobody-talks-about',
      date: new Date('2026-03-20'),
      categories: ['Backend', 'API Design'],
      readTime: 5,
      summary:
        "Every API is a promise. Breaking that promise — even with good intentions — is how distributed systems fail silently. Here's what I've learned designing APIs that teams actually trust.",
    },
    {
      title: 'Why I Stopped Chasing New Frameworks',
      slug: 'stopped-chasing-new-frameworks',
      date: new Date('2026-03-01'),
      categories: ['Engineering Mindset', 'Career'],
      readTime: 3,
      summary:
        "There's always a new framework promising to solve everything. After years of chasing them, I realized the engineers who understand fundamentals deeply always outlast the ones who chase trends.",
    },
    {
      title: 'Why Most Software is Overengineered',
      slug: 'why-most-software-is-overengineered',
      date: new Date('2026-04-06'),
      categories: ['Software Architecture'],
      readTime: 4,
      summary:
        'The dangerous default of building for 10x scale on day one — and why the engineers I trust most push back on unnecessary complexity before a single line of code is written.',
    },
    {
      title: 'The API Contract Nobody Talks About',
      slug: 'api-contract-nobody-talks-about',
      date: new Date('2026-03-20'),
      categories: ['Backend', 'API Design'],
      readTime: 5,
      summary:
        "Every API is a promise. Breaking that promise — even with good intentions — is how distributed systems fail silently. Here's what I've learned designing APIs that teams actually trust.",
    },
    {
      title: 'Why I Stopped Chasing New Frameworks',
      slug: 'stopped-chasing-new-frameworks',
      date: new Date('2026-03-01'),
      categories: ['Engineering Mindset', 'Career'],
      readTime: 3,
      summary:
        "There's always a new framework promising to solve everything. After years of chasing them, I realized the engineers who understand fundamentals deeply always outlast the ones who chase trends.",
    },
    {
      title: 'Why Most Software is Overengineered',
      slug: 'why-most-software-is-overengineered',
      date: new Date('2026-04-06'),
      categories: ['Engineering Mindset'],
      readTime: 4,
      summary:
        'The dangerous default of building for 10x scale on day one — and why the engineers I trust most push back on unnecessary complexity before a single line of code is written.',
    },
    {
      title: 'The API Contract Nobody Talks About',
      slug: 'api-contract-nobody-talks-about',
      date: new Date('2026-03-20'),
      categories: ['Backend', 'API Design'],
      readTime: 5,
      summary:
        "Every API is a promise. Breaking that promise — even with good intentions — is how distributed systems fail silently. Here's what I've learned designing APIs that teams actually trust.",
    },
    {
      title: 'Why I Stopped Chasing New Frameworks',
      slug: 'stopped-chasing-new-frameworks',
      date: new Date('2026-03-01'),
      categories: ['Engineering Mindset', 'Career'],
      readTime: 3,
      summary:
        "There's always a new framework promising to solve everything. After years of chasing them, I realized the engineers who understand fundamentals deeply always outlast the ones who chase trends.",
    },
    {
      title: 'Why Most Software is Overengineered',
      slug: 'why-most-software-is-overengineered',
      date: new Date('2026-04-06'),
      categories: ['Engineering Mindset'],
      readTime: 4,
      summary:
        'The dangerous default of building for 10x scale on day one — and why the engineers I trust most push back on unnecessary complexity before a single line of code is written.',
    },
    {
      title: 'The API Contract Nobody Talks About',
      slug: 'api-contract-nobody-talks-about',
      date: new Date('2026-03-20'),
      categories: ['Backend', 'API Design'],
      readTime: 5,
      summary:
        "Every API is a promise. Breaking that promise — even with good intentions — is how distributed systems fail silently. Here's what I've learned designing APIs that teams actually trust.",
    },
    {
      title: 'Why I Stopped Chasing New Frameworks',
      slug: 'stopped-chasing-new-frameworks',
      date: new Date('2026-03-01'),
      categories: ['Engineering Mindset', 'Career'],
      readTime: 3,
      summary:
        "There's always a new framework promising to solve everything. After years of chasing them, I realized the engineers who understand fundamentals deeply always outlast the ones who chase trends.",
    },
    {
      title: 'Why Most Software is Overengineered',
      slug: 'why-most-software-is-overengineered',
      date: new Date('2026-04-06'),
      categories: ['Engineering Mindset'],
      readTime: 4,
      summary:
        'The dangerous default of building for 10x scale on day one — and why the engineers I trust most push back on unnecessary complexity before a single line of code is written.',
    },
    {
      title: 'The API Contract Nobody Talks About',
      slug: 'api-contract-nobody-talks-about',
      date: new Date('2026-03-20'),
      categories: ['Backend', 'API Design'],
      readTime: 5,
      summary:
        "Every API is a promise. Breaking that promise — even with good intentions — is how distributed systems fail silently. Here's what I've learned designing APIs that teams actually trust.",
    },
    {
      title: 'Why I Stopped Chasing New Frameworks',
      slug: 'stopped-chasing-new-frameworks',
      date: new Date('2026-03-01'),
      categories: ['Engineering Mindset', 'Career'],
      readTime: 3,
      summary:
        "There's always a new framework promising to solve everything. After years of chasing them, I realized the engineers who understand fundamentals deeply always outlast the ones who chase trends.",
    },
  ];

  getBlogPosts(): BlogPost[] {
    return [...this.blogPosts].sort((a, b) => b.date.getTime() - a.date.getTime());
  }
}
