import { chromium } from 'playwright';

async function verifyHeroHeadline() {
  console.log('=== VERIFYING HERO HEADLINE SPACING ===');
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });

  // 1. Desktop Arabic (1440x900)
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
    const page = await context.newPage();
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);

    const heroFrame = page.locator('#home .relative.w-full.aspect-auto, #home > div').first();
    await heroFrame.screenshot({ path: 'test_screenshots/hero_headline_desktop_ar.png' });
    console.log('✓ Desktop Arabic Hero captured: test_screenshots/hero_headline_desktop_ar.png');
    await context.close();
  }

  // 2. Mobile Arabic (390x844)
  {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
    const page = await context.newPage();
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);

    const heroFrame = page.locator('#home .relative.w-full.aspect-auto, #home > div').first();
    await heroFrame.screenshot({ path: 'test_screenshots/hero_headline_mobile_ar.png' });
    console.log('✓ Mobile Arabic Hero captured: test_screenshots/hero_headline_mobile_ar.png');
    await context.close();
  }

  await browser.close();
}

verifyHeroHeadline();
