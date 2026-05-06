import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlogPost } from '../models/blog-post.model';
import { map, switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { marked } from 'marked';

@Injectable({
  providedIn: 'root',
})
export class BlogPostsService {
  private repoUrl = 'https://api.github.com/repos/DivakarVelagacherla/blog-posts/contents/posts';
  private rawUrl = 'https://raw.githubusercontent.com/DivakarVelagacherla/blog-posts/main/posts';

  constructor(private httpClient: HttpClient) {}

  fetchPosts() {
    return this.httpClient.get<any[]>(this.repoUrl);
  }

  fetchPostContent(slug: string) {
    return this.httpClient.get(`${this.rawUrl}/${slug}.md`, { responseType: 'text' });
  }

  getBlogPosts() {
    return this.fetchPosts().pipe(
      map((files) => files.filter((file) => file.name.endsWith('.md'))),
      switchMap((files) =>
        forkJoin(files.map((file) => this.fetchPost(file.name.replace('.md', '')))),
      ),
    );
  }

  private parseFrontmatter(markdown: string): { metadata: any; content: string } {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = markdown.match(frontmatterRegex);

    if (!match) return { metadata: {}, content: markdown };

    const yamlContent = match[1];
    const content = match[2];

    const metadata: any = {};
    yamlContent.split('\n').forEach((line) => {
      const [key, ...values] = line.split(':');
      if (key && values.length) {
        metadata[key.trim()] = values.join(':').trim().replace(/"/g, '');
      }
    });

    return { metadata, content };
  }

  fetchPost(slug: string) {
    return this.fetchPostContent(slug).pipe(
      map((markdown) => {
        const { metadata, content } = this.parseFrontmatter(markdown);
        console.log('metadata', metadata);
        return {
          title: metadata['title'],
          slug: metadata['slug'],
          date: new Date(metadata['date']),
          categories: metadata['categories']?.split(',').map((c: string) => c.trim()) || [],
          readTime: parseInt(metadata['readTime']),
          summary: metadata['summary'],
          content: marked(content) as string,
        } as BlogPost;
      }),
    );
  }
}
