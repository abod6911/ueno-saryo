import { chromium } from 'playwright';

async function verifyDessertsTypography() {
  console.log('=== VERIFYING DESSERTS TYPOGRAPHY (ARABIC) ===');
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const header = page.locator('#desserts .max-w-3xl').first();
  await header.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);

  await header.screenshot({ path: 'test_screenshots/desserts_header_arabic_fix.png' });
  console.log('✓ Desserts header screenshot captured: test_screenshots/desserts_header_arabic_fix.png');

  await browser.close();
}

verifyDessertsTypography();
