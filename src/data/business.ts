import type { BusinessInfo } from '../types/business';

export const BUSINESS_DATA: BusinessInfo = {
  nameEn: 'Ueno Saryo Tea Experience',
  nameAr: 'مختبرات الشاي',
  nameJa: '茶道研究所',
  taglineEn: 'Artisanal Matcha & Japanese Tea Culture in Jeddah',
  taglineAr: 'تجربة الشاي والماتشا اليابانية الأصيلة في جدة',
  descriptionEn:
    'A sanctuary dedicated to the precision, aroma, and mindful ritual of Japanese tea craft and artisanal ceremonial matcha in the heart of Ar Rawdah, Jeddah.',
  descriptionAr:
    'ملاذ استثنائي مكرس لدقة وطقوس الشاي الياباني الفاخر والماتشا الاحتفالية المصنوعة بأعلى معايير الإتقان في قلب حي الروضة بجدة.',
  address: {
    streetEn: '7140 Prince Saud Al Faisal',
    streetAr: '٧١٤٠ طريق الأمير سعود الفيصل',
    districtEn: 'Ar Rawdah',
    districtAr: 'حي الروضة',
    cityEn: 'Jeddah',
    cityAr: 'جدة',
    postalCode: '23432',
    countryEn: 'Saudi Arabia',
    countryAr: 'المملكة العربية السعودية',
  },
  coordinates: {
    lat: 21.575,
    lng: 39.155,
  },
  phone: '+966500000000',
  phoneDisplay: '+966 50 000 0000',
  googleMapsUrl: 'https://maps.google.com/?q=Ueno+Saryo+Prince+Saud+Al+Faisal+Ar+Rawdah+Jeddah',
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3710.680076045934!2d39.1550!3d21.5750!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDM0JzMwLjAiTiAzOcKwMDknMTguMCJF!5e0!3m2!1sen!2ssa!4v1620000000000!5m2!1sen!2ssa',
  hungerStationUrl: 'https://hungerstation.com/sa-ar/restaurant/ueno-saryo-jeddah',
  jahezUrl: 'https://jahez.net/',
  instagramUrl: 'https://instagram.com/uenosaryo',
  tiktokUrl: 'https://tiktok.com/@uenosaryo',
  openingHours: [
    { dayEn: 'Saturday', dayAr: 'السبت', opens: '08:00', closes: '23:30' },
    { dayEn: 'Sunday', dayAr: 'الأحد', opens: '08:00', closes: '23:30' },
    { dayEn: 'Monday', dayAr: 'الإثنين', opens: '08:00', closes: '23:30' },
    { dayEn: 'Tuesday', dayAr: 'الثلاثاء', opens: '08:00', closes: '23:30' },
    { dayEn: 'Wednesday', dayAr: 'الأربعاء', opens: '08:00', closes: '23:30' },
    { dayEn: 'Thursday', dayAr: 'الخميس', opens: '08:00', closes: '00:00' },
    { dayEn: 'Friday', dayAr: 'الجمعة', opens: '13:30', closes: '00:30' },
  ],
  rating: {
    score: 4.2,
    reviewCount: 184,
    source: 'Google Maps Verified Reviews',
  },
};
