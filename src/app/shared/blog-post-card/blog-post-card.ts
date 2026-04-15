import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPost } from '../../models/blog-post.model';
import { BlogPostsService } from '../../services/blog-post';

@Component({
  selector: 'app-blog-post-card',
  imports: [CommonModule],
  templateUrl: './blog-post-card.html',
  styleUrl: './blog-post-card.css',
})
export class BlogPostCard {
  @Input() post!: BlogPost;
}
