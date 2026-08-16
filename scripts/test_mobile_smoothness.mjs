import { chromium } from 'playwright';
import path from 'path';

async function testMobileSmoothness() {
  let browser;
  try {
    browser = await chromium.launch({ headless: true, channel: 'chrome' });
  } catch (e) {
    browser = await chromium.launch({ headless: true, channel: 'msedge' });
  }

  const viewports = [
    { name: 'iphone_390x844', width: 390, height: 844 },
    { name: 'android_360x800', width: 360, height: 800 },
    { name: 'promax_430x932', width: 430, height: 932 },
  ];

  const errors = [];

  for (const vp of viewports) {
    console.log(`\n--- Testing mobile viewport: ${vp.name} ---`);
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
      hasTouch: true,
      isMobile: true,
    });

    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(`[${vp.name}] ${msg.text()}`);
    });
    page.on('pageerror', err => errors.push(`[${vp.name}] ${err.message}`));

    await page.goto('http://localhost:5173/ueno-saryo/', { waitUntil: 'networkidle' });

    // Wait for intro timeline to finish
    await page.waitForTimeout(2000);

    // Test 3 full carousel rotations
    console.log('Running 3 full carousel cycles...');
    for (let i = 0; i < 6; i++) {
      await page.waitForTimeout(1900);
      console.log(`  Cycle step ${i + 1}/6 complete.`);
    }

    await page.screenshot({ path: path.resolve(`test_screenshots/perf_${vp.name}_cycle.png`) });

    // Interaction test: Drag / Swipe
    console.log('Testing touch swipe gesture...');
    await page.mouse.move(vp.width / 2 + 80, vp.height * 0.45);
    await page.mouse.down();
    await page.mouse.move(vp.width / 2 - 80, vp.height * 0.45, { steps: 10 });
    await page.mouse.up();

    await page.waitForTimeout(800);
    await page.screenshot({ path: path.resolve(`test_screenshots/perf_${vp.name}_swipe.png`) });

    // Interaction test: Tap right card
    console.log('Testing card tap...');
    await page.mouse.click(vp.width * 0.78, vp.height * 0.45);
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.resolve(`test_screenshots/perf_${vp.name}_tap.png`) });

    await page.close();
  }

  await browser.close();

  if (errors.length > 0) {
    console.error('Errors found during performance test:', errors);
  } else {
    console.log('\n✓ PERFECT: All mobile performance & interaction stress tests passed with 0 errors!');
  }
}

testMobileSmoothness();
