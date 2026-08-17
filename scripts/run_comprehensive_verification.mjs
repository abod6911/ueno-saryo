import { chromium } from 'playwright';
import fs from 'fs';

const ARTIFACT_DIR = 'C:/Users/abodv/.gemini/antigravity/brain/be5ca263-d9e3-4de4-b58b-20dd5275cfb9';

const TESTS = [
  { name: 'desktop_1920x1080_hero_ar', width: 1920, height: 1080, fullPage: false },
  { name: 'desktop_1920x1080_full_ar', width: 1920, height: 1080, fullPage: true },
  { name: 'laptop_1440x900_hero_ar', width: 1440, height: 900, fullPage: false },
  { name: 'tablet_768x1024_hero_ar', width: 768, height: 1024, fullPage: false },
  { name: 'mobile_390x844_hero_ar', width: 390, height: 844, fullPage: false },
  { name: 'mobile_390x844_full_ar', width: 390, height: 844, fullPage: true },
  { name: 'mobile_430x932_hero_ar', width: 430, height: 932, fullPage: false },
  { name: 'desktop_1920x1080_hero_en', width: 1920, height: 1080, fullPage: false, lang: 'en' },
];

async function runComprehensiveVerification() {
  console.log('=== RUNNING COMPREHENSIVE MULTI-DEVICE VERIFICATION ===');
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const consoleErrors = [];

  for (const t of TESTS) {
    const context = await browser.newContext({
      viewport: { width: t.width, height: t.height },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(`[${t.name}] ${msg.text()}`);
      }
    });

    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    if (t.lang === 'en') {
      const langBtn = page.locator('button:has-text("EN"), button:has-text("AR")').first();
      if (await langBtn.isVisible()) {
        await langBtn.click();
        await page.waitForTimeout(800);
      }
    }

    const targetPath = `${ARTIFACT_DIR}/${t.name}.png`;
    await page.screenshot({ path: targetPath, fullPage: t.fullPage });
    console.log(`✓ Captured: ${t.name}.png`);
    await context.close();
  }

  await browser.close();
  console.log('\nVerification Summary:');
  console.log('Errors:', consoleErrors.length === 0 ? '0 (ALL PASS)' : consoleErrors);
}

runComprehensiveVerification();
