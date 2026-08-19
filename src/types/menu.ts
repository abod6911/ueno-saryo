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

export interface DrinkMedia {
  type: 'video' | 'image' | 'animated-image';
  src: string;
  mobileSrc?: string;
  poster?: string;
}

export interface DrinkTeaLabInfo {
  labCode: string; // e.g. "UENO LAB / 001", "TEA STUDY 04"
  origin?: {
    en: string;
    ar: string;
    zh: string;
    ja?: string;
  };
  servingTemp?: string; // e.g. "75°C", "4°C", "80°C"
  teaBase?: {
    en: string;
    ar: string;
    zh: string;
  };
  brewingStyle?: {
    en: string;
    ar: string;
    zh: string;
  };
  sweetness?: 'Zero' | 'Low' | 'Medium' | 'Customizable';
  milkType?: {
    en: string;
    ar: string;
    zh: string;
  };
  seasonal?: boolean;
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
  media?: DrinkMedia;
  labDetails?: DrinkTeaLabInfo;
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
