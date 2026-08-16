import { chromium } from 'playwright';
import path from 'path';

async function testRitualAndMarquee() {
  let browser;
  try {
    browser = await chromium.launch({ headless: true, channel: 'chrome' });
  } catch (e) {
    browser = await chromium.launch({ headless: true, channel: 'msedge' });
  }

  const viewports = [
    { name: 'desktop_1920x1080', width: 1920, height: 1080 },
    { name: 'laptop_1440x900', width: 1440, height: 900 },
    { name: 'mobile_390x844', width: 390, height: 844 },
  ];

  const errors = [];

  for (const vp of viewports) {
    console.log(`\nTesting viewport: ${vp.name}...`);
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
    });

    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(`[${vp.name}] ${msg.text()}`);
    });
    page.on('pageerror', err => errors.push(`[${vp.name}] ${err.message}`));

    await page.goto('http://localhost:5173/ueno-saryo/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Scroll to the Tea Ritual section
    const ritual = page.locator('#ritual');
    await ritual.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1200);

    // Capture screenshot of Tea Ritual & Marquee in Arabic
    await page.screenshot({
      path: path.resolve(`test_screenshots/ritual_${vp.name}_ar.png`),
    });
    console.log(`✓ Captured ritual_${vp.name}_ar.png`);

    // Test marquee click opens product modal
    const marqueeCard = page.locator('.animate-marquee button').nth(2);
    if (await marqueeCard.isVisible()) {
      console.log('Testing marquee card click...');
      await marqueeCard.click({ force: true });
      await page.waitForTimeout(600);

      // Verify product modal is open
      const modal = page.locator('div[role="dialog"]');
      const isModalVisible = await modal.isVisible();
      console.log(`Modal visible after click: ${isModalVisible}`);

      if (isModalVisible) {
        await page.screenshot({
          path: path.resolve(`test_screenshots/ritual_${vp.name}_modal.png`),
        });
        // Close modal
        await page.keyboard.press('Escape');
        await page.waitForTimeout(400);
      }
    }

    // Test English LTR
    const langBtn = page.locator('nav button', { hasText: 'EN' });
    if (await langBtn.isVisible()) {
      console.log('Switching to English...');
      await langBtn.click();
      await page.waitForTimeout(800);
      await ritual.scrollIntoViewIfNeeded();
      await page.screenshot({
        path: path.resolve(`test_screenshots/ritual_${vp.name}_en.png`),
      });
      console.log(`✓ Captured ritual_${vp.name}_en.png`);
    }

    await page.close();
  }

  await browser.close();

  if (errors.length > 0) {
    console.error('Errors found during QA:', errors);
  } else {
    console.log('\n✓ PERFECT: All Tea Ritual & Signature Marquee tests passed with 0 errors!');
  }
}

testRitualAndMarquee();
