import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogPost } from '../../models/blog-post.model';

@Component({
  selector: 'app-blog-post-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-post-card.html',
  styleUrl: './blog-post-card.css',
})
export class BlogPostCard {
  @Input() post!: BlogPost;
}
