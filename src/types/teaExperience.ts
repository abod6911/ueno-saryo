export interface ProcessStep {
  number: string;
  nameEn: string;
  nameAr: string;
  nameZh?: string;
  nameJa?: string;
  descriptionEn: string;
  descriptionAr: string;
  descriptionZh?: string;
  image: string;
  scientificNoteEn: string;
  scientificNoteAr: string;
  scientificNoteZh?: string;
}

export interface TeaProcessStep {
  stepNumber: string;
  titleEn: string;
  titleAr: string;
  titleZh?: string;
  titleJa?: string;
  subtitleEn: string;
  subtitleAr: string;
  subtitleZh?: string;
  descriptionEn: string;
  descriptionAr: string;
  descriptionZh?: string;
  detailEn: string;
  detailAr: string;
  detailZh?: string;
  iconName: string;
  image: string;
}

export interface TeaVariety {
  id: string;
  nameEn: string;
  nameAr: string;
  nameZh?: string;
  nameJa: string;
  typeEn: string;
  typeAr: string;
  typeZh?: string;
  category?: string;
  categoryAr?: string;
  categoryZh?: string;
  originEn: string;
  originAr: string;
  originZh?: string;
  steepTemp: string;
  steepTime: string;
  steepTimeSeconds?: number;
  waterTempCelsius?: number;
  descriptionEn: string;
  descriptionAr: string;
  descriptionZh?: string;
  caffeine?: 'Low' | 'Medium' | 'High' | 'Zero';
  caffeineAr?: string;
  caffeineZh?: string;
  flavorProfileEn?: string[];
  flavorProfileAr?: string[];
  flavorProfileZh?: string[];
}

export interface ReviewItem {
  id: string;
  authorName: string;
  date: string;
  dateZh?: string;
  rating: number;
  commentEn: string;
  commentAr: string;
  commentZh?: string;
  source: 'Google Maps' | 'Verified Guest';
  highlightEn?: string;
  highlightAr?: string;
  highlightZh?: string;
}

export interface GalleryPhoto {
  id: string;
  titleEn: string;
  titleAr: string;
  titleZh?: string;
  categoryEn: string;
  categoryAr: string;
  categoryZh?: string;
  image: string;
  aspectRatio: 'square' | 'portrait' | 'landscape';
}

export interface GalleryItem {
  id: string;
  titleEn: string;
  titleAr: string;
  titleZh?: string;
  category: 'atmosphere' | 'craft' | 'origin' | 'dessert';
  image: string;
  aspectRatio: 'square' | 'portrait' | 'landscape';
}
