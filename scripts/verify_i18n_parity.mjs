import { en } from '../src/i18n/en.ts';
import { ar } from '../src/i18n/ar.ts';
import { zhCN } from '../src/i18n/zh-CN.ts';
import { MENU_CATEGORIES, MENU_ITEMS } from '../src/data/menu.ts';
import { TEA_LAB_STEPS, TEA_VARIETIES } from '../src/data/teaExperience.ts';
import { REVIEWS_DATA } from '../src/data/reviews.ts';
import { GALLERY_ITEMS } from '../src/data/gallery.ts';
import { BUSINESS_DATA } from '../src/data/business.ts';

let errors = 0;

function logError(msg) {
  console.error(`❌ [QA FAIL] ${msg}`);
  errors++;
}

function logSuccess(msg) {
  console.log(`✅ [QA PASS] ${msg}`);
}

// 1. Recursive key parity check
function compareKeys(objA, objB, path = '', langA = 'EN', langB = 'ZH-CN') {
  for (const key of Object.keys(objA)) {
    const currentPath = path ? `${path}.${key}` : key;
    if (!(key in objB)) {
      logError(`Missing key in ${langB}: "${currentPath}"`);
    } else if (typeof objA[key] === 'object' && objA[key] !== null && !Array.isArray(objA[key])) {
      if (typeof objB[key] !== 'object' || objB[key] === null) {
        logError(`Type mismatch for key "${currentPath}" between ${langA} and ${langB}`);
      } else {
        compareKeys(objA[key], objB[key], currentPath, langA, langB);
      }
    }
  }
}

console.log('--- 1. Dictionary Key Parity Checks ---');
compareKeys(en, zhCN, '', 'EN', 'ZH-CN');
compareKeys(zhCN, en, '', 'ZH-CN', 'EN');
compareKeys(ar, zhCN, '', 'AR', 'ZH-CN');

// 2. Menu Categories QA
console.log('--- 2. Menu Categories QA ---');
for (const cat of MENU_CATEGORIES) {
  if (!cat.name.zh) logError(`Menu category "${cat.id}" is missing name.zh`);
  if (!cat.name.en) logError(`Menu category "${cat.id}" is missing name.en`);
  if (!cat.name.ar) logError(`Menu category "${cat.id}" is missing name.ar`);
}
logSuccess(`Verified ${MENU_CATEGORIES.length} menu categories.`);

// 3. Menu Items QA
console.log('--- 3. Menu Items QA ---');
for (const item of MENU_ITEMS) {
  if (!item.name.zh) logError(`Menu item "${item.id}" missing name.zh`);
  if (!item.description.zh) logError(`Menu item "${item.id}" missing description.zh`);
  if (!item.tastingNotes?.zh || item.tastingNotes.zh.length === 0) {
    logError(`Menu item "${item.id}" missing tastingNotes.zh`);
  }
  if (!item.ingredients?.zh || item.ingredients.zh.length === 0) {
    logError(`Menu item "${item.id}" missing ingredients.zh`);
  }
}
logSuccess(`Verified ${MENU_ITEMS.length} menu items.`);

// 4. Tea Lab Steps QA
console.log('--- 4. Tea Lab Steps QA ---');
for (const step of TEA_LAB_STEPS) {
  if (!step.nameZh) logError(`Tea lab step ${step.number} missing nameZh`);
  if (!step.descriptionZh) logError(`Tea lab step ${step.number} missing descriptionZh`);
  if (!step.scientificNoteZh) logError(`Tea lab step ${step.number} missing scientificNoteZh`);
}
logSuccess(`Verified ${TEA_LAB_STEPS.length} Tea Lab steps.`);

// 5. Tea Varieties QA
console.log('--- 5. Tea Varieties QA ---');
for (const variety of TEA_VARIETIES) {
  if (!variety.nameZh) logError(`Tea variety "${variety.id}" missing nameZh`);
  if (!variety.typeZh) logError(`Tea variety "${variety.id}" missing typeZh`);
  if (!variety.originZh) logError(`Tea variety "${variety.id}" missing originZh`);
  if (!variety.descriptionZh) logError(`Tea variety "${variety.id}" missing descriptionZh`);
  if (!variety.flavorProfileZh || variety.flavorProfileZh.length === 0) {
    logError(`Tea variety "${variety.id}" missing flavorProfileZh`);
  }
}
logSuccess(`Verified ${TEA_VARIETIES.length} Tea Varieties.`);

// 6. Reviews QA
console.log('--- 6. Reviews QA ---');
for (const rev of REVIEWS_DATA) {
  if (!rev.commentZh) logError(`Review "${rev.id}" missing commentZh`);
  if (!rev.highlightZh) logError(`Review "${rev.id}" missing highlightZh`);
  if (!rev.dateZh) logError(`Review "${rev.id}" missing dateZh`);
}
logSuccess(`Verified ${REVIEWS_DATA.length} Reviews.`);

// 7. Gallery QA
console.log('--- 7. Gallery QA ---');
for (const gal of GALLERY_ITEMS) {
  if (!gal.titleZh) logError(`Gallery item "${gal.id}" missing titleZh`);
}
logSuccess(`Verified ${GALLERY_ITEMS.length} Gallery items.`);

// 8. Business Info QA
console.log('--- 8. Business Info QA ---');
if (!BUSINESS_DATA.nameZh) logError('BUSINESS_DATA missing nameZh');
if (!BUSINESS_DATA.taglineZh) logError('BUSINESS_DATA missing taglineZh');
if (!BUSINESS_DATA.descriptionZh) logError('BUSINESS_DATA missing descriptionZh');
if (!BUSINESS_DATA.address.cityZh) logError('BUSINESS_DATA missing address.cityZh');
if (!BUSINESS_DATA.address.districtZh) logError('BUSINESS_DATA missing address.districtZh');
if (!BUSINESS_DATA.address.streetZh) logError('BUSINESS_DATA missing address.streetZh');
for (const day of BUSINESS_DATA.openingHours) {
  if (!day.dayZh) logError(`Opening hours day "${day.dayEn}" missing dayZh`);
}
logSuccess('Verified Business Data.');

console.log('------------------------------------');
if (errors === 0) {
  console.log('🎉 ALL CHINESE LOCALIZATION QA CHECKS PASSED WITH 100% PARITY & COMPLETENESS! 🎉');
  process.exit(0);
} else {
  console.error(`💥 FAILED WITH ${errors} QA ERRORS!`);
  process.exit(1);
}
