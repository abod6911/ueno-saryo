import { chromium } from 'playwright';
import path from 'path';

async function testAllHeroFlavors() {
  let browser;
  try {
    browser = await chromium.launch({ headless: true, channel: 'chrome' });
  } catch (e) {
    browser = await chromium.launch({ headless: true, channel: 'msedge' });
  }

  const viewports = [
    { name: 'desktop_1920x1080', width: 1920, height: 1080 },
    { name: 'mobile_390x844', width: 390, height: 844, isMobile: true },
  ];

  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      isMobile: vp.isMobile || false,
    });
    const page = await context.newPage();
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Capture initial flavor (matcha-latte)
    await page.screenshot({
      path: path.resolve(`test_screenshots/${vp.name}_flavor_1_original.png`),
    });

    // Find orbit cards to click next flavors
    const orbitCards = await page.locator('[data-flavor-id], .group[role="button"], button[aria-label*="Select"]').all();
    console.log(`Found ${orbitCards.length} interactive elements in hero`);

    // Let's test flavor switching
    // Click through the 4 flavors by clicking each flavor card in orbit or selecting flavor
    for (let i = 0; i < 4; i++) {
      await page.evaluate((idx) => {
        // Trigger flavor switch via window custom event or clicking card
        const cards = document.querySelectorAll('.group');
        if (cards[idx]) (cards[idx]).click();
      }, i);

      await page.waitForTimeout(600);
      await page.screenshot({
        path: path.resolve(`test_screenshots/${vp.name}_flavor_${i + 1}.png`),
      });
    }

    await context.close();
  }

  await browser.close();
  console.log('All flavor screenshots captured!');
}

testAllHeroFlavors();
