import { Component, OnInit, NgZone } from '@angular/core';
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
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 6;
  pagedPosts: BlogPost[][] = [];
  private isWheeling: boolean = false;

  constructor(
    private blogPostService: BlogPostsService,
    private ngZone: NgZone,
  ) {}

  ngOnInit(): void {
    this.allBlogPosts = this.blogPostService.getBlogPosts();
    this.totalPages = Math.ceil(this.allBlogPosts.length / this.pageSize);

    for (let i = 0; i < this.allBlogPosts.length; i += this.pageSize) {
      this.pagedPosts.push(this.allBlogPosts.slice(i, i + this.pageSize));
    }
  }

  trackBySlug(_index: number, post: BlogPost): string {
    return post.slug;
  }

  onClickPageDot(pageNo: number): void {
    this.currentPage = pageNo;
  }

  onWheelSwipe(event: WheelEvent): void {
    console.log(event);
    event.preventDefault();

    if (this.isWheeling) return;

    if (event.deltaX > 10) {
      this.isWheeling = true;
      if (this.currentPage < this.totalPages - 1) {
        this.currentPage++;
      }
      setTimeout(() => (this.isWheeling = false), 500);
    }

    if (event.deltaX < -10) {
      this.isWheeling = true;
      if (this.currentPage > 0) {
        this.currentPage--;
      }

      setTimeout(() => (this.isWheeling = false), 500);
    }
  }
}
