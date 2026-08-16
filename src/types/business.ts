export interface DayHours {
  dayEn: string;
  dayAr: string;
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
  nameJa: string;
  taglineEn: string;
  taglineAr: string;
  descriptionEn: string;
  descriptionAr: string;
  address: {
    streetEn: string;
    streetAr: string;
    districtEn: string;
    districtAr: string;
    cityEn: string;
    cityAr: string;
    postalCode: string;
    countryEn: string;
    countryAr: string;
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
  closesOrOpensAtTextEn: string;
  closesOrOpensAtTextAr: string;
  nextChangeTime?: string;
}
