import { TestBed } from '@angular/core/testing';

import { BlogPosts } from './blog-posts';

describe('BlogPosts', () => {
  let service: BlogPosts;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogPosts);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
