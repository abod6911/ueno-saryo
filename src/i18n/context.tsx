import React, { createContext, useContext, useState, useEffect } from 'react';
import { en } from './en';
import { ar } from './ar';
import { zhCN } from './zh-CN';

export type Locale = 'ar' | 'en' | 'zh-CN';
export type TranslationDict = typeof ar;

const dictionaries: Record<Locale, TranslationDict> = {
  ar,
  en,
  'zh-CN': zhCN,
};

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void; // Legacy support
  t: TranslationDict;
  isRTL: boolean;
  isZh: boolean;
  isAr: boolean;
  isEn: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ueno_locale');
      if (saved === 'en' || saved === 'ar' || saved === 'zh-CN') return saved;
    }
    return 'ar'; // Default to Arabic for local business in Jeddah
  });

  useEffect(() => {
    localStorage.setItem('ueno_locale', locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';

    document.documentElement.classList.remove('font-arabic', 'font-chinese', 'font-sans');
    if (locale === 'ar') {
      document.documentElement.classList.add('font-arabic');
    } else if (locale === 'zh-CN') {
      document.documentElement.classList.add('font-chinese');
    } else {
      document.documentElement.classList.add('font-sans');
    }
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
  };

  // Cycle toggle for legacy callers: ar -> en -> zh-CN -> ar
  const toggleLocale = () => {
    setLocaleState((prev) => {
      if (prev === 'ar') return 'en';
      if (prev === 'en') return 'zh-CN';
      return 'ar';
    });
  };

  const t = dictionaries[locale] || ar;
  const isRTL = locale === 'ar';
  const isZh = locale === 'zh-CN';
  const isAr = locale === 'ar';
  const isEn = locale === 'en';

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggleLocale, t, isRTL, isZh, isAr, isEn }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

/**
 * Universal localized string getter with fallback to English then Arabic
 */
export function getLocalizedText(
  locale: Locale,
  content: { ar?: string; en?: string; zh?: string; 'zh-CN'?: string }
): string {
  if (locale === 'ar') return content.ar || content.en || '';
  if (locale === 'zh-CN') return content.zh || content['zh-CN'] || content.en || content.ar || '';
  return content.en || content.ar || '';
}
