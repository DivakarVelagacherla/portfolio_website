import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPost } from '../../models/blog-post.model';

@Component({
  selector: 'app-blog-content-modal',
  imports: [CommonModule],
  templateUrl: './blog-content-modal.html',
  styleUrl: './blog-content-modal.css',
})
export class BlogContentModal {
  @Input() post: BlogPost | null = null;
  @Input() isOpen: boolean = false;
  @Output() onClose = new EventEmitter<void>();
}
