import type { BusinessInfo, OpenStatusResult } from '../types/business';

/**
 * Calculates current open/closed status in Jeddah (Asia/Riyadh timezone)
 * Supports English, Arabic, and Simplified Chinese localization.
 */
export function getJeddahOpenStatus(business: BusinessInfo): OpenStatusResult {
  // Get current date & time specifically in Asia/Riyadh timezone
  const now = new Date();
  const riyadhFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Riyadh',
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });

  const parts = riyadhFormatter.formatToParts(now);
  let weekdayStr = '';
  let hour = 0;
  let minute = 0;

  for (const part of parts) {
    if (part.type === 'weekday') weekdayStr = part.value;
    if (part.type === 'hour') hour = parseInt(part.value, 10);
    if (part.type === 'minute') minute = parseInt(part.value, 10);
  }

  const currentMinutes = hour * 60 + minute;

  // Find today's schedule
  const todaySchedule = business.openingHours.find(
    (h) => h.dayEn.toLowerCase() === weekdayStr.toLowerCase()
  );

  if (!todaySchedule || todaySchedule.isClosed) {
    return {
      isOpen: false,
      statusTextEn: 'Closed Today',
      statusTextAr: 'مغلق اليوم',
      statusTextZh: '今日休息',
      closesOrOpensAtTextEn: 'Opens tomorrow at 08:00',
      closesOrOpensAtTextAr: 'يفتح غداً الساعة ٠٨:٠٠ صباحاً',
      closesOrOpensAtTextZh: '将于明日 08:00 开始营业',
    };
  }

  const [openH, openM] = todaySchedule.opens.split(':').map(Number);
  const [closeH, closeM] = todaySchedule.closes.split(':').map(Number);

  const openMinutes = openH * 60 + openM;
  // If close time is past midnight (e.g., 00:00 or 00:30), closeMinutes is > 1440
  let closeMinutes = closeH * 60 + closeM;
  if (closeMinutes < openMinutes) {
    closeMinutes += 24 * 60; // next day early morning
  }

  // Adjusted currentMinutes for after-midnight wrap
  let adjustedCurrent = currentMinutes;
  if (adjustedCurrent < openMinutes && closeMinutes > 1440) {
    adjustedCurrent += 24 * 60;
  }

  const isOpen = adjustedCurrent >= openMinutes && adjustedCurrent < closeMinutes;

  if (isOpen) {
    const formattedCloseTime = formatTimeDisplay(todaySchedule.closes);
    return {
      isOpen: true,
      statusTextEn: 'Open Now',
      statusTextAr: 'مفتوح الآن',
      statusTextZh: '营业中',
      closesOrOpensAtTextEn: `Closes at ${formattedCloseTime.en}`,
      closesOrOpensAtTextAr: `يغلق الساعة ${formattedCloseTime.ar}`,
      closesOrOpensAtTextZh: `营业至 ${formattedCloseTime.zh}`,
      nextChangeTime: todaySchedule.closes,
    };
  } else {
    // Determine next opening
    const formattedOpenTime = formatTimeDisplay(todaySchedule.opens);
    return {
      isOpen: false,
      statusTextEn: 'Closed',
      statusTextAr: 'مغلق حالياً',
      statusTextZh: '已打烊',
      closesOrOpensAtTextEn: `Opens at ${formattedOpenTime.en}`,
      closesOrOpensAtTextAr: `يفتح الساعة ${formattedOpenTime.ar}`,
      closesOrOpensAtTextZh: `将于 ${formattedOpenTime.zh} 开始营业`,
      nextChangeTime: todaySchedule.opens,
    };
  }
}

function formatTimeDisplay(timeStr: string): { en: string; ar: string; zh: string } {
  const [h, m] = timeStr.split(':').map(Number);
  const periodEn = h >= 12 ? 'PM' : 'AM';
  const periodAr = h >= 12 ? 'مساءً' : 'صباحاً';
  const displayH = h % 12 === 0 ? 12 : h % 12;
  const displayM = m === 0 ? '00' : m < 10 ? `0${m}` : `${m}`;
  const padH = h < 10 ? `0${h}` : `${h}`;

  return {
    en: `${displayH}:${displayM} ${periodEn}`,
    ar: `${displayH}:${displayM} ${periodAr}`,
    zh: `${padH}:${displayM}`,
  };
}
