import { chromium } from 'playwright';
import path from 'path';

async function testHeroEachDrink() {
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

    // Capture drink 1
    await page.screenshot({
      path: path.resolve(`test_screenshots/${vp.name}_hero_drink_1.png`),
    });

    // Wait for auto-rotation to drink 2
    await page.waitForTimeout(2600);
    await page.screenshot({
      path: path.resolve(`test_screenshots/${vp.name}_hero_drink_2.png`),
    });

    // Wait for auto-rotation to drink 3
    await page.waitForTimeout(2600);
    await page.screenshot({
      path: path.resolve(`test_screenshots/${vp.name}_hero_drink_3.png`),
    });

    // Wait for auto-rotation to drink 4
    await page.waitForTimeout(2600);
    await page.screenshot({
      path: path.resolve(`test_screenshots/${vp.name}_hero_drink_4.png`),
    });

    await context.close();
  }

  await browser.close();
  console.log('All hero drink screenshots saved!');
}

testHeroEachDrink();
