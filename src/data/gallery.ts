import type { GalleryItem } from '../types/teaExperience';
import { getAssetUrl } from '../lib/assetUrl';

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gallery-1',
    titleEn: 'Zen Architectural Tea Bar',
    titleAr: 'بار الشاي المستوحى من فلسفة الزن اليابانية',
    titleZh: '日式禅意美学空间茶吧',
    category: 'atmosphere',
    image: getAssetUrl('assets/gallery/gallery_interior_zen.jpg'),
    aspectRatio: 'landscape',
  },
  {
    id: 'gallery-2',
    titleEn: 'Ceremonial Whisking Craft',
    titleAr: 'طقوس خفق الماتشا بالمضرب التقليدي (Chasen)',
    titleZh: '百本立竹茶筅仪式点茶工法',
    category: 'craft',
    image: getAssetUrl('assets/gallery/gallery_tea_master.jpg'),
    aspectRatio: 'portrait',
  },
  {
    id: 'gallery-3',
    titleEn: 'Misty Uji Tea Gardens',
    titleAr: 'مزارع الشاي الضبابية في أوجي، كيوتو',
    titleZh: '京都宇治云雾覆下茶园',
    category: 'origin',
    image: getAssetUrl('assets/gallery/gallery_uji_harvest.jpg'),
    aspectRatio: 'landscape',
  },
  {
    id: 'gallery-4',
    titleEn: 'Artisanal Ceramic Chawan Vessels',
    titleAr: 'أواني الشاي الفخارية المصنوعة يدوياً',
    titleZh: '日本名家手作陶艺茶碗列席',
    category: 'craft',
    image: getAssetUrl('assets/gallery/gallery_chawan_collection.jpg'),
    aspectRatio: 'landscape',
  },
  {
    id: 'gallery-5',
    titleEn: 'Artisanal Japanese Sweets & Wagashi',
    titleAr: 'تشكيلة الحلويات اليابانية الطازجة والموتشي',
    titleZh: '手作日式和菓子与生大福茶点',
    category: 'dessert',
    image: getAssetUrl('assets/gallery/gallery_dessert_spread.jpg'),
    aspectRatio: 'portrait',
  },
  {
    id: 'gallery-6',
    titleEn: 'Single-Origin Tea Pour',
    titleAr: 'انسياب الشاي الياباني الصافي في إبريق الكيوسو',
    titleZh: '急须壶原叶清茶出汤盛景',
    category: 'craft',
    image: getAssetUrl('assets/gallery/gallery_tea_pour.jpg'),
    aspectRatio: 'landscape',
  },
];
