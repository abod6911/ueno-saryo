export type MenuBadge = 'bestseller' | 'signature' | 'limited' | 'exclusive' | 'lowcaffeine' | 'new';

export interface MenuCategory {
  id: string;
  slug: string;
  order: number;
  name: {
    en: string;
    ar: string;
    zh?: string;
    ja?: string;
  };
  description?: {
    en: string;
    ar: string;
    zh?: string;
  };
  icon?: string;
}

export interface MenuItem {
  id: string;
  slug: string;
  categoryId: string;
  name: {
    en: string;
    ar: string;
    zh?: string;
    ja?: string;
  };
  description: {
    en: string;
    ar: string;
    zh?: string;
  };
  priceSAR: number;
  calories?: number;
  caffeineLevel?: 'Zero' | 'Low' | 'Medium' | 'High';
  temperature?: 'Iced' | 'Hot' | 'Both';
  image: string;
  fruitImage?: string;
  badges?: MenuBadge[];
  featured?: boolean;
  available: boolean;
  tastingNotes?: {
    en: string[];
    ar: string[];
    zh?: string[];
  };
  ingredients?: {
    en: string[];
    ar: string[];
    zh?: string[];
  };
}
