import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../../models/blog-post.model';
import { BlogPostsService } from '../../services/blog-post';
import { CommonModule } from '@angular/common';
import { BlogPostCard } from '../../shared/blog-post-card/blog-post-card';
import { PaginationComponent } from '../../shared/pagination/pagination';

@Component({
  selector: 'app-blog-posts-component',
  imports: [CommonModule, BlogPostCard, PaginationComponent],
  templateUrl: './blog-posts-component.html',
  styleUrl: './blog-posts-component.css',
})
export class BlogPostsComponent implements OnInit {
  allBlogPosts: BlogPost[] = [];
  pageSize: number = 6;
  currentPage: number = 0;
  totalPages: number = 0;
  visiblePosts: BlogPost[] = [];

  constructor(private blogPostService: BlogPostsService) {}

  ngOnInit(): void {
    this.allBlogPosts = this.blogPostService.getBlogPosts();
    this.totalPages = Math.ceil(this.allBlogPosts.length / this.pageSize);
    this.getVisiblePosts(this.currentPage);
  }

  trackBySlug(_index: number, post: BlogPost): string {
    return post.slug;
  }

  getVisiblePosts(currentPage: number): void {
    const start = currentPage * this.pageSize;
    this.visiblePosts = this.allBlogPosts.slice(start, start + this.pageSize);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.getVisiblePosts(this.currentPage);
  }
}
