import { chromium } from 'playwright';

async function verifyReviewsCinematic() {
  console.log('=== VERIFYING REVIEWS CINEMATIC REVEAL ===');
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });

  // 1. Desktop Arabic (1440x900)
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
    const page = await context.newPage();
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const reviews = page.locator('#reviews');
    await reviews.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1200); // allow sequence to settle

    await reviews.screenshot({ path: 'test_screenshots/reviews_desktop_ar.png' });
    console.log('✓ Desktop Arabic reviews captured: test_screenshots/reviews_desktop_ar.png');
    await context.close();
  }

  // 2. Desktop English (1440x900)
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
    const page = await context.newPage();
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const langBtn = page.locator('button:has-text("EN"), button:has-text("AR")').first();
    if (await langBtn.isVisible()) {
      await langBtn.click();
      await page.waitForTimeout(500);
    }

    const reviews = page.locator('#reviews');
    await reviews.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1200);

    await reviews.screenshot({ path: 'test_screenshots/reviews_desktop_en.png' });
    console.log('✓ Desktop English reviews captured: test_screenshots/reviews_desktop_en.png');
    await context.close();
  }

  // 3. Mobile Arabic (390x844)
  {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
    const page = await context.newPage();
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const reviews = page.locator('#reviews');
    await reviews.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1200);

    await reviews.screenshot({ path: 'test_screenshots/reviews_mobile_ar.png' });
    console.log('✓ Mobile Arabic reviews captured: test_screenshots/reviews_mobile_ar.png');
    await context.close();
  }

  await browser.close();
}

verifyReviewsCinematic();
