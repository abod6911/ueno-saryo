export type Language = 'en' | 'ar';

export interface ProjectCaseStudy {
  id: string;
  slug: string;
  title: string;
  titleAr: string;
  client: string;
  clientAr: string;
  year: string;
  category: string;
  categoryAr: string;
  services: string[];
  servicesAr: string[];
  tagline: string;
  taglineAr: string;
  resultBadge: string;
  resultBadgeAr: string;
  heroImage: string;
  mockupType: 'browser' | 'mobile' | 'nfc' | 'editorial';
  challenge: string;
  challengeAr: string;
  solution: string;
  solutionAr: string;
  deliverables: string[];
  deliverablesAr: string[];
  stats: {
    label: string;
    labelAr: string;
    value: string;
    suffix?: string;
  }[];
  demoUrl?: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  titleAr: string;
  shortDesc: string;
  shortDescAr: string;
  fullDesc: string;
  fullDescAr: string;
  capabilities: string[];
  capabilitiesAr: string[];
  icon: string;
  accentBadge?: string;
  accentBadgeAr?: string;
}

export interface ClientPartner {
  id: string;
  name: string;
  nameAr: string;
  industry: string;
  industryAr: string;
  category: 'restaurant' | 'cafe' | 'ecommerce' | 'corporate' | 'retail';
  verified: boolean;
  featured?: boolean;
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  titleAr: string;
  subtitle: string;
  subtitleAr: string;
  description: string;
  descriptionAr: string;
  deliverables: string[];
  deliverablesAr: string[];
}

export interface StatMetric {
  value: string;
  suffix?: string;
  label: string;
  labelAr: string;
  description: string;
  descriptionAr: string;
}
