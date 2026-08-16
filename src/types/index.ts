export interface Project {
  id: string;
  title: string;
  italicTitle?: string;
  category: string;
  year: string;
  image: string;
  colSpan: 'col-span-12 md:col-span-7' | 'col-span-12 md:col-span-5';
  aspectRatio: string;
  description: string;
  tags: string[];
  link?: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  readTime: string;
  date: string;
  category: string;
  image: string;
  link?: string;
}

export interface ExplorationItem {
  id: string;
  title: string;
  category: string;
  image: string;
  aspectRatio?: string;
  rotation?: string;
  column: 1 | 2;
  description: string;
}

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
}
