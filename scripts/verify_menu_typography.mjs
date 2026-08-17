import { chromium } from 'playwright';

async function verifyMenuTypography() {
  console.log('=== VERIFYING MENU TYPOGRAPHY (ARABIC) ===');
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // Scroll directly so menu header is centered in viewport
  const h2 = page.locator('#menu h2');
  await h2.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);

  // Take screenshot of menu header
  const menuHeader = page.locator('#menu .max-w-3xl').first();
  await menuHeader.screenshot({ path: 'test_screenshots/menu_header_arabic_fix.png' });
  console.log('✓ Menu header screenshot captured: test_screenshots/menu_header_arabic_fix.png');

  await browser.close();
}

verifyMenuTypography();
