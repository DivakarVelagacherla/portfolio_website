export interface LearningNode {
  title: string;
  slug: string;
  description?: string;
  /** Relative path from the software-engineering repo root to the .md file. Leaf nodes only. */
  path?: string;
  children?: LearningNode[];
  /** View state: whether this group/book is expanded in the sidebar. */
  expanded?: boolean;
}
