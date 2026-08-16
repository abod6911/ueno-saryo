import { chromium } from 'playwright';
import path from 'path';

async function runVisualQAHero() {
  let browser;
  try {
    browser = await chromium.launch({ headless: true, channel: 'chrome' });
  } catch (e) {
    browser = await chromium.launch({ headless: true, channel: 'msedge' });
  }

  const viewports = [
    { name: 'desktop_1920x1080', width: 1920, height: 1080 },
    { name: 'laptop_1440x900', width: 1440, height: 900 },
    { name: 'tablet_768x1024', width: 768, height: 1024 },
    { name: 'mobile_390x844', width: 390, height: 844, isMobile: true },
    { name: 'mobile_430x932', width: 430, height: 932, isMobile: true },
  ];

  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      isMobile: vp.isMobile || false,
    });
    const page = await context.newPage();
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1200);

    // Capture Hero on this viewport
    await page.screenshot({
      path: path.resolve(`test_screenshots/qa_${vp.name}_hero_realism.png`),
    });

    await context.close();
  }

  await browser.close();
  console.log('Visual QA screenshots captured successfully!');
}

runVisualQAHero();
