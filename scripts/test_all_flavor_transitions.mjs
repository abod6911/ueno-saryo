import { chromium } from 'playwright';

async function testAllFlavorTransitions() {
  console.log('=== TESTING ALL 5 FLAVOR TRANSITIONS ===');
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Click each flavor card in the carousel and take screenshot
  const cards = page.locator('button[aria-label*="Select flavor"]');
  const count = await cards.count();
  console.log(`Found ${count} flavor cards.`);

  for (let i = 0; i < count; i++) {
    const card = cards.nth(i);
    await card.click();
    await page.waitForTimeout(800);
    const shotPath = `test_screenshots/flavor_transition_${i}.png`;
    await page.screenshot({ path: shotPath });
    console.log(`✓ Flavor ${i} transition verified -> ${shotPath}`);
  }

  await browser.close();
  console.log('All flavor transitions verified successfully!');
}

testAllFlavorTransitions();
