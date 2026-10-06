import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { marked } from 'marked';
import { LearningNode } from '../models/learning.model';

const HEADING_BLOCKLIST = new Set([
  'table of contents',
  'contents',
  'how to read this book',
  'how this book connects to the last one',
  'roadmap',
]);

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function cleanHeadingText(text: string): string {
  return text.replace(/[`*_]/g, '').trim();
}

@Injectable({
  providedIn: 'root',
})
export class LearningService {
  private baseUrl =
    'https://raw.githubusercontent.com/DivakarVelagacherla/software-engineering/main';

  constructor(private httpClient: HttpClient) {}

  private fetchRaw(path: string): Observable<string> {
    return this.httpClient.get(`${this.baseUrl}/${path}`, { responseType: 'text' });
  }

  getNavigation(): Observable<LearningNode[]> {
    return this.fetchRaw('README.md').pipe(
      switchMap((rootMarkdown) => {
        const folderRegex = /\]\(\.\/([^)]+)\/\)/g;
        const folders: string[] = [];
        let match: RegExpExecArray | null;
        while ((match = folderRegex.exec(rootMarkdown))) {
          if (!folders.includes(match[1])) folders.push(match[1]);
        }

        if (folders.length === 0) return of([]);

        return forkJoin(
          folders.map((folder) =>
            this.fetchRaw(`${folder}/README.md`).pipe(
              map((markdown) => this.buildBookNode(folder, folder, markdown)),
            ),
          ),
        );
      }),
    );
  }

  getChapterHtml(path: string): Observable<string> {
    const directory = path.includes('/') ? path.slice(0, path.lastIndexOf('/')) : '';
    return this.fetchRaw(path).pipe(
      map((markdown) => this.resolveImagePaths(marked(markdown) as string, directory)),
    );
  }

  /**
   * Chapter markdown links to its images with paths relative to its own file
   * (e.g. `![diagram](url-shortener.png)`), which only resolve correctly on GitHub itself.
   * Rewrite those to absolute raw.githubusercontent.com URLs so they render here too.
   */
  private resolveImagePaths(html: string, directory: string): string {
    return html.replace(/(<img[^>]+src=")([^"]+)(")/g, (match, prefix, src, suffix) => {
      if (/^([a-z]+:)?\/\//i.test(src) || src.startsWith('/')) return match;
      const relativePath = src.replace(/^\.\//, '');
      const resolved = directory ? `${directory}/${relativePath}` : relativePath;
      return `${prefix}${this.baseUrl}/${resolved}${suffix}`;
    });
  }

  private buildBookNode(slug: string, folder: string, markdown: string): LearningNode {
    const tokens = marked.lexer(markdown);
    const h1 = tokens.find((token) => token.type === 'heading' && (token as any).depth === 1) as
      | { text: string }
      | undefined;
    const title = h1 ? cleanHeadingText(h1.text) : slug;

    return {
      title,
      slug,
      children: this.buildChildren(tokens, folder),
    };
  }

  private buildChildren(tokens: ReturnType<typeof marked.lexer>, bookFolder: string): LearningNode[] {
    const root: LearningNode = { title: '', slug: '', children: [] };
    const stack: { depth: number; node: LearningNode }[] = [{ depth: 1, node: root }];
    const listItemMarker = /^\s*(?:[-*+]|\d+\.)\s+(?:\[[ xX]\]\s+)?/;

    for (const token of tokens) {
      if (token.type === 'heading') {
        const depth = (token as any).depth as number;
        if (depth === 1) continue;

        while (stack.length > 1 && stack[stack.length - 1].depth >= depth) {
          stack.pop();
        }

        const text = cleanHeadingText((token as any).text);
        if (HEADING_BLOCKLIST.has(text.toLowerCase())) continue;

        const groupNode: LearningNode = { title: text, slug: slugify(text), children: [] };
        stack[stack.length - 1].node.children!.push(groupNode);
        stack.push({ depth, node: groupNode });
      } else if (token.type === 'list') {
        const parent = stack[stack.length - 1].node;
        for (const item of (token as any).items) {
          const raw: string = (item.raw ?? '').replace(listItemMarker, '');
          const linkMatch = raw.match(/\[([^\]]+)\]\(([^)]+)\)/);
          if (!linkMatch) continue;

          const [fullLink, linkText, rawUrl] = linkMatch;
          const url = rawUrl.replace(/^<|>$/g, '');
          const urlWithoutAnchor = url.split('#')[0];
          if (!/\.md$/i.test(urlWithoutAnchor)) continue;

          const relativePath = urlWithoutAnchor.replace(/^\.\//, '');
          const fullPath = `${bookFolder}/${relativePath}`;
          const description =
            raw
              .replace(fullLink, '')
              .replace(/\s+/g, ' ')
              .replace(/^[\s—–-]+/, '')
              .trim() || undefined;

          parent.children!.push({
            title: linkText.trim(),
            slug: slugify(relativePath.split('/').pop()!.replace(/\.md$/i, '')),
            path: fullPath,
            description,
          });
        }
      }
    }

    return root.children!;
  }
}
