import { chromium } from 'playwright';

async function verifyVisitTypography() {
  console.log('=== VERIFYING VISIT TYPOGRAPHY (ARABIC) ===');
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const header = page.locator('#visit .max-w-3xl').first();
  await header.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);

  await header.screenshot({ path: 'test_screenshots/visit_header_arabic_fix.png' });
  console.log('✓ Visit header screenshot captured: test_screenshots/visit_header_arabic_fix.png');

  await browser.close();
}

verifyVisitTypography();
