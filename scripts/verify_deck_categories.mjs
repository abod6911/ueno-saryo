import { chromium } from 'playwright';

async function verifyDeckCategories() {
  console.log('=== VERIFYING TEA INDEX DECK CATEGORIES ===');
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });

  // 1. Desktop English
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
    const page = await context.newPage();
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    // Switch to English
    const langBtn = page.locator('button:has-text("EN"), button:has-text("AR")').first();
    if (await langBtn.isVisible()) {
      await langBtn.click();
      await page.waitForTimeout(600);
    }

    const deck = page.locator('#menu .max-w-6xl').first();
    await deck.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await deck.screenshot({ path: 'test_screenshots/deck_desktop_en.png' });
    console.log('✓ Desktop EN Deck captured: test_screenshots/deck_desktop_en.png');
    await context.close();
  }

  // 2. Desktop Arabic
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
    const page = await context.newPage();
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const deck = page.locator('#menu .max-w-6xl').first();
    await deck.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await deck.screenshot({ path: 'test_screenshots/deck_desktop_ar.png' });
    console.log('✓ Desktop AR Deck captured: test_screenshots/deck_desktop_ar.png');
    await context.close();
  }

  // 3. Mobile English
  {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
    const page = await context.newPage();
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const deck = page.locator('#menu .max-w-6xl').first();
    await deck.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await deck.screenshot({ path: 'test_screenshots/deck_mobile_ar.png' });
    console.log('✓ Mobile Deck captured: test_screenshots/deck_mobile_ar.png');
    await context.close();
  }

  await browser.close();
}

verifyDeckCategories();
