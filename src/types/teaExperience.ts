export interface ProcessStep {
  number: string;
  nameEn: string;
  nameAr: string;
  nameJa?: string;
  descriptionEn: string;
  descriptionAr: string;
  image: string;
  scientificNoteEn: string;
  scientificNoteAr: string;
}

export interface TeaProcessStep {
  stepNumber: string;
  titleEn: string;
  titleAr: string;
  titleJa?: string;
  subtitleEn: string;
  subtitleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  detailEn: string;
  detailAr: string;
  iconName: string;
  image: string;
}

export interface TeaVariety {
  id: string;
  nameEn: string;
  nameAr: string;
  nameJa: string;
  typeEn: string;
  typeAr: string;
  category?: string;
  categoryAr?: string;
  originEn: string;
  originAr: string;
  steepTemp: string;
  steepTime: string;
  steepTimeSeconds?: number;
  waterTempCelsius?: number;
  descriptionEn: string;
  descriptionAr: string;
  caffeine?: 'Low' | 'Medium' | 'High' | 'Zero';
  caffeineAr?: string;
  flavorProfileEn?: string[];
  flavorProfileAr?: string[];
}

export interface ReviewItem {
  id: string;
  authorName: string;
  date: string;
  rating: number;
  commentEn: string;
  commentAr: string;
  source: 'Google Maps' | 'Verified Guest';
  highlightEn?: string;
  highlightAr?: string;
}

export interface GalleryPhoto {
  id: string;
  titleEn: string;
  titleAr: string;
  categoryEn: string;
  categoryAr: string;
  image: string;
  aspectRatio: 'square' | 'portrait' | 'landscape';
}

export interface GalleryItem {
  id: string;
  titleEn: string;
  titleAr: string;
  category: 'atmosphere' | 'craft' | 'origin' | 'dessert';
  image: string;
  aspectRatio: 'square' | 'portrait' | 'landscape';
}
