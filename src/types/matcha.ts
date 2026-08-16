export interface HeroFlavor {
  id: string;
  nameEn: string;
  nameAr: string;
  nameJa?: string;
  priceSAR: number;
  priceFormatted: string;
  calories?: number;
  productImage: string;
  fruitImage: string;
  fruitAlt: string;
  themeColor: string;
  descriptionEn: string;
  descriptionAr: string;
  tastingNotesEn: string;
  tastingNotesAr: string;
  // Legacy aliases
  name?: string;
  price?: string;
}

export type Flavor = HeroFlavor;

export interface CardTransform {
  x: number;
  y: number;
  rotation: number;
  scale: number;
  opacity: number;
  blur: number;
  zIndex: number;
}

