import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPost } from '../../models/blog-post.model';

@Component({
  selector: 'app-blog-post-card',
  imports: [CommonModule],
  templateUrl: './blog-post-card.html',
  styleUrl: './blog-post-card.css',
})
export class BlogPostCard {
  @Input() post!: BlogPost;
  @Output() onReadMore = new EventEmitter<BlogPost>();
}
