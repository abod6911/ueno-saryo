import React, { useMemo } from 'react';
import { BUSINESS_DATA } from '../../data/business';
import { getJeddahOpenStatus } from '../../lib/openingHours';
import { useLanguage } from '../../i18n/context';
import { Clock, Check, Globe } from 'lucide-react';

export const OpeningHoursCard: React.FC = () => {
  const { locale, t } = useLanguage();
  const openStatus = useMemo(() => getJeddahOpenStatus(BUSINESS_DATA), []);

  // Determine current day in Riyadh
  const riyadhDay = useMemo(() => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Riyadh',
      weekday: 'long',
    });
    return formatter.format(new Date());
  }, []);

  return (
    <div className="w-full bg-[#122416] rounded-3xl p-6 sm:p-8 border border-white/12 shadow-2xl flex flex-col justify-between text-[#f8f7f1]">
      <div className="flex flex-col gap-4">
        {/* Header with Live Status Pill */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#939458]" />
            <h3 className="font-headline text-lg sm:text-xl font-bold text-white">
              {t.visit.hoursTitle}
            </h3>
          </div>

          <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full border border-white/15">
            <span
              className={`w-2 h-2 rounded-full ${
                openStatus.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
              }`}
            />
            <span className="text-xs font-bold text-white">
              {locale === 'ar' ? openStatus.statusTextAr : openStatus.statusTextEn}
            </span>
          </div>
        </div>

        {/* Status description */}
        <p className="text-xs text-[#939458] font-mono">
          {locale === 'ar'
            ? openStatus.closesOrOpensAtTextAr
            : openStatus.closesOrOpensAtTextEn}
        </p>

        {/* Days Table */}
        <div className="flex flex-col gap-2 pt-2">
          {BUSINESS_DATA.openingHours.map((schedule) => {
            const isToday = schedule.dayEn.toLowerCase() === riyadhDay.toLowerCase();
            const dayName = locale === 'ar' ? schedule.dayAr : schedule.dayEn;

            return (
              <div
                key={schedule.dayEn}
                className={`flex items-center justify-between p-2.5 rounded-xl text-xs transition-colors ${
                  isToday
                    ? 'bg-[#29482a] text-white font-bold ring-1 ring-[#939458]/40'
                    : 'text-[#f8f7f1]/70 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2">
                  {isToday && <Check className="w-3.5 h-3.5 text-[#939458]" />}
                  <span>{dayName}</span>
                  {isToday && (
                    <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-white/20 text-white font-mono">
                      {locale === 'ar' ? 'اليوم' : 'Today'}
                    </span>
                  )}
                </div>

                <div className="font-mono text-end ltr:direction-ltr">
                  {schedule.opens} – {schedule.closes}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footnote Timezone Notice */}
      <div className="pt-4 mt-4 border-t border-white/10 flex items-center gap-2 text-[10px] text-[#f8f7f1]/50 font-mono">
        <Globe className="w-3 h-3 text-[#939458]" />
        <span>{t.visit.timezoneNotice}</span>
      </div>
    </div>
  );
};
