import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BlogPost } from '../../models/blog-post.model';
import { BlogPostsService } from '../../services/blog-post';
import { CommonModule } from '@angular/common';
import { BlogPostCard } from '../../shared/blog-post-card/blog-post-card';
import { PaginationComponent } from '../../shared/pagination/pagination';
import { BlogContentModal } from '../../shared/blog-content-modal/blog-content-modal';

@Component({
  selector: 'app-blog-posts-component',
  imports: [CommonModule, BlogPostCard, PaginationComponent, BlogContentModal],
  templateUrl: './blog-posts-component.html',
  styleUrl: './blog-posts-component.css',
})
export class BlogPostsComponent implements OnInit {
  allBlogPosts: BlogPost[] = [];
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 6;
  pagedPosts: BlogPost[][] = [];
  isModalOpen: boolean = false;
  selectedPost: BlogPost | null = null;

  constructor(
    private blogPostService: BlogPostsService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.blogPostService.getBlogPosts().subscribe((posts) => {
      this.allBlogPosts = posts.sort((a, b) => b.date.getTime() - a.date.getTime());
      this.totalPages = Math.ceil(this.allBlogPosts.length / this.pageSize);
      this.pagedPosts = [];
      for (let i = 0; i < this.allBlogPosts.length; i += this.pageSize) {
        this.pagedPosts.push(this.allBlogPosts.slice(i, i + this.pageSize));
      }
      this.cdr.detectChanges();
    });
  }

  openPost(post: BlogPost): void {
    this.blogPostService.fetchPost(post.slug).subscribe((fullPost) => {
      this.selectedPost = fullPost;
      this.isModalOpen = true;
      this.cdr.detectChanges();
    });
  }

  closePost(): void {
    this.isModalOpen = false;
    this.selectedPost = null;
  }

  trackBySlug(_index: number, post: BlogPost): string {
    return post.slug;
  }

  onClickPageDot(page: number): void {
    this.currentPage = page;
    const slider = document.querySelector('.slider-wrapper') as HTMLElement;
    slider.scrollTo({
      left: page * slider.clientWidth,
      behavior: 'smooth',
    });
  }

  onSliderScroll(event: Event): void {
    const slider = event.target as HTMLElement;
    const pageWidth = slider.clientWidth;
    this.currentPage = Math.round(slider.scrollLeft / pageWidth);
  }
}
