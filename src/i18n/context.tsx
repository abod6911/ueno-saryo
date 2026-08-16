import React, { createContext, useContext, useState, useEffect } from 'react';
import { en } from './en';
import { ar } from './ar';

export type Locale = 'ar' | 'en';
export type TranslationDict = typeof ar;

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: TranslationDict;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ueno_locale');
      if (saved === 'en' || saved === 'ar') return saved;
    }
    return 'ar'; // Default to Arabic for local business in Jeddah
  });

  useEffect(() => {
    localStorage.setItem('ueno_locale', locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    if (locale === 'ar') {
      document.documentElement.classList.add('font-arabic');
      document.documentElement.classList.remove('font-sans');
    } else {
      document.documentElement.classList.add('font-sans');
      document.documentElement.classList.remove('font-arabic');
    }
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
  };

  const toggleLocale = () => {
    setLocaleState((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const t = locale === 'ar' ? ar : en;
  const isRTL = locale === 'ar';

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggleLocale, t, isRTL }}>
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
