export interface DayHours {
  dayEn: string;
  dayAr: string;
  dayZh?: string;
  opens: string; // "08:00"
  closes: string; // "23:30"
  isClosed?: boolean;
}

export interface BusinessCoordinates {
  lat: number;
  lng: number;
}

export interface BusinessInfo {
  nameEn: string;
  nameAr: string;
  nameZh?: string;
  nameJa: string;
  taglineEn: string;
  taglineAr: string;
  taglineZh?: string;
  descriptionEn: string;
  descriptionAr: string;
  descriptionZh?: string;
  address: {
    streetEn: string;
    streetAr: string;
    streetZh?: string;
    districtEn: string;
    districtAr: string;
    districtZh?: string;
    cityEn: string;
    cityAr: string;
    cityZh?: string;
    postalCode: string;
    countryEn: string;
    countryAr: string;
    countryZh?: string;
  };
  coordinates: BusinessCoordinates;
  phone: string;
  phoneDisplay: string;
  googleMapsUrl: string;
  googleMapsEmbedUrl?: string;
  hungerStationUrl?: string;
  jahezUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  openingHours: DayHours[];
  rating: {
    score: number;
    reviewCount: number;
    source: string;
  };
}

export interface OpenStatusResult {
  isOpen: boolean;
  statusTextEn: string;
  statusTextAr: string;
  statusTextZh?: string;
  closesOrOpensAtTextEn: string;
  closesOrOpensAtTextAr: string;
  closesOrOpensAtTextZh?: string;
  nextChangeTime?: string;
}
