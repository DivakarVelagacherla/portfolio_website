import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { BlogPostsService } from '../../services/blog-post';
import { BlogPost } from '../../models/blog-post.model';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-blog-post-page',
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-post.page.html',
  styleUrl: './blog-post.page.css',
})
export class BlogPostPage implements OnInit, OnDestroy {
  post: BlogPost | null = null;
  isLoading = true;
  isError = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogPostService: BlogPostsService,
    private meta: Meta,
    private titleService: Title,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) {
      this.isError = true;
      this.isLoading = false;
      return;
    }

    this.blogPostService
      .fetchPost(slug)
      .pipe(catchError(() => of(null)))
      .subscribe((post) => {
        this.isLoading = false;
        if (!post) {
          this.isError = true;
          this.cdr.detectChanges();
          return;
        }
        this.post = post;
        this.setMetaTags(post);
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.titleService.setTitle('DV Portfolio');
    this.meta.removeTag('name="description"');
    this.meta.removeTag('property="og:title"');
    this.meta.removeTag('property="og:description"');
    this.meta.removeTag('property="og:url"');
    this.meta.removeTag('property="og:type"');
    this.meta.removeTag('name="twitter:card"');
    this.meta.removeTag('name="twitter:title"');
    this.meta.removeTag('name="twitter:description"');
  }

  goBack(): void {
    this.router.navigate(['/engineering'], { queryParams: { scrollTo: 'Blogs' } });
  }

  private setMetaTags(post: BlogPost): void {
    this.titleService.setTitle(`${post.title} | Divakar Velagacherla`);
    this.meta.updateTag({ name: 'description', content: post.summary });
    this.meta.updateTag({ property: 'og:title', content: post.title });
    this.meta.updateTag({ property: 'og:description', content: post.summary });
    this.meta.updateTag({ property: 'og:url', content: `https://divakarvelagacherla.com/blog/${post.slug}` });
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: post.title });
    this.meta.updateTag({ name: 'twitter:description', content: post.summary });
  }
}
