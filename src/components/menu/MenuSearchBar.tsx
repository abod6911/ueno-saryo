import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../i18n/context';
import { Search, X } from 'lucide-react';

interface MenuSearchBarProps {
  onSearch: (query: string) => void;
}

export const MenuSearchBar: React.FC<MenuSearchBarProps> = ({ onSearch }) => {
  const { t } = useLanguage();
  const [inputValue, setInputValue] = useState('');
  const timeoutRef = useRef<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);

    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      onSearch(val.trim());
    }, 150); // 150ms debounce for responsive typing
  };

  const handleClear = () => {
    setInputValue('');
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    onSearch('');
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="relative w-full max-w-md">
      <div className="relative flex items-center">
        <Search className="w-4 h-4 absolute start-4 text-[#181813]/40 pointer-events-none" />
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder={t.menu.searchPlaceholder}
          className="w-full h-11 sm:h-12 ps-11 pe-10 bg-white rounded-full text-xs sm:text-sm text-[#181813] placeholder:text-[#181813]/40 border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#29482a] focus:border-transparent transition-all shadow-sm"
        />
        {inputValue && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="w-7 h-7 absolute end-3 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 text-[#181813]/60 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
