export interface TechItem {
  name: string;
  primary?: boolean;
}

export interface TechGroup {
  category: string;
  items: TechItem[];
}
