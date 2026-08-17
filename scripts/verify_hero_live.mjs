import { chromium } from 'playwright';
import fs from 'fs';

const VIEWPORTS = [
  { name: 'desktop_1920x1080', width: 1920, height: 1080 },
  { name: 'laptop_1440x900', width: 1440, height: 900 },
  { name: 'mobile_390x844_strawberry', width: 390, height: 844, flavorIdx: 1 },
  { name: 'mobile_390x844_original', width: 390, height: 844, flavorIdx: 0 },
  { name: 'mobile_430x932', width: 430, height: 932, flavorIdx: 2 },
];

async function verifyHeroLive() {
  console.log('=== VERIFYING LIVE HERO WITH NEW ISOLATED ASSETS ===');
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const consoleErrors = [];

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(`[${vp.name}] ${msg.text()}`);
      }
    });

    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // If specific flavor requested, click that card
    if (vp.flavorIdx !== undefined && vp.flavorIdx > 0) {
      const cards = page.locator('button[aria-label*="Select flavor"]');
      const count = await cards.count();
      if (count > vp.flavorIdx) {
        await cards.nth(vp.flavorIdx).click();
        await page.waitForTimeout(800);
      }
    }

    const shotPath = `test_screenshots/live_hero_${vp.name}.png`;
    await page.screenshot({ path: shotPath });
    console.log(`✓ Screenshot captured: ${shotPath}`);

    await context.close();
  }

  await browser.close();

  console.log('\nConsole Errors:', consoleErrors.length === 0 ? '0 Errors (PASS)' : consoleErrors);
}

verifyHeroLive();
