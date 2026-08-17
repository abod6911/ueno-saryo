import { chromium } from 'playwright';

async function verifyMenuMobile() {
  console.log('=== VERIFYING MENU TYPOGRAPHY (MOBILE 390x844) ===');
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const h2 = page.locator('#menu h2');
  await h2.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);

  const menuHeader = page.locator('#menu .max-w-3xl').first();
  await menuHeader.screenshot({ path: 'test_screenshots/menu_header_mobile_fix.png' });
  console.log('✓ Mobile menu header captured: test_screenshots/menu_header_mobile_fix.png');

  await browser.close();
}

verifyMenuMobile();
