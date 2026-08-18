import React, { useState, useRef, useEffect, memo } from 'react';
import { useLanguage, type Locale } from '../../i18n/context';
import { Globe, Check, ChevronDown } from 'lucide-react';

interface LanguageOption {
  code: Locale;
  label: string;
  shortLabel: string;
  dir: 'rtl' | 'ltr';
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'ar', label: 'العربية', shortLabel: 'العربية', dir: 'rtl' },
  { code: 'en', label: 'English', shortLabel: 'EN', dir: 'ltr' },
  { code: 'zh-CN', label: '简体中文', shortLabel: '中文', dir: 'ltr' },
];

interface LanguageSelectorProps {
  variant?: 'desktop' | 'mobile' | 'footer' | 'dock';
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = memo(({
  variant = 'desktop',
  className = '',
}) => {
  const { locale, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((l) => l.code === locale) || LANGUAGES[0];

  // Close dropdown on click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (variant === 'mobile') {
    return (
      <div className={`flex flex-col gap-2 w-full ${className}`}>
        <div className="flex items-center gap-2 text-xs font-mono text-[#939458] tracking-wider uppercase px-1">
          <Globe className="w-3.5 h-3.5" />
          <span>Language / اللغة / 语言</span>
        </div>
        <div className="grid grid-cols-3 gap-2 bg-black/20 p-1.5 rounded-2xl border border-white/10">
          {LANGUAGES.map((lang) => {
            const isSelected = locale === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => setLocale(lang.code)}
                className={`flex items-center justify-center py-2.5 px-3 rounded-xl text-xs font-medium transition-all duration-200 min-h-[44px] ${
                  isSelected
                    ? 'bg-[#29482a] text-[#f8f7f1] shadow-md border border-white/20 font-semibold'
                    : 'text-[#f8f7f1]/70 hover:text-white hover:bg-white/5'
                }`}
                aria-pressed={isSelected}
              >
                <span>{lang.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Desktop Dropdown
  return (
    <div ref={dropdownRef} className={`relative inline-block text-start ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-xs font-medium text-[#f8f7f1] border border-white/15 backdrop-blur-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#939458]/50 cursor-pointer min-h-[36px]"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select Language"
      >
        <Globe className="w-3.5 h-3.5 text-[#939458]" />
        <span className="font-sans font-medium">{currentLang.label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-[#939458] transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute end-0 top-full mt-2 w-36 rounded-2xl bg-[#122416]/95 backdrop-blur-xl border border-white/15 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
        >
          {LANGUAGES.map((lang) => {
            const isSelected = locale === lang.code;
            return (
              <button
                key={lang.code}
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  setLocale(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer text-start ${
                  isSelected
                    ? 'bg-[#29482a] text-[#f8f7f1] font-semibold'
                    : 'text-[#f8f7f1]/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>{lang.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#939458]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
});

LanguageSelector.displayName = 'LanguageSelector';
