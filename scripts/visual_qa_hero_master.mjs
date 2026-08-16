import { chromium } from 'playwright';
import path from 'path';

const VIEWPORTS = [
  { name: 'mobile_360x800', width: 360, height: 800 },
  { name: 'mobile_390x844', width: 390, height: 844 },
  { name: 'mobile_430x932', width: 430, height: 932 },
  { name: 'tablet_768x1024', width: 768, height: 1024 },
  { name: 'tablet_820x1180', width: 820, height: 1180 },
  { name: 'laptop_1280x800', width: 1280, height: 800 },
  { name: 'laptop_1440x900', width: 1440, height: 900 },
  { name: 'desktop_1728x1117', width: 1728, height: 1117 },
  { name: 'desktop_1920x1080', width: 1920, height: 1080 },
];

async function runVisualQA() {
  let browser;
  try {
    browser = await chromium.launch({ headless: true, channel: 'chrome' });
  } catch (e) {
    browser = await chromium.launch({ headless: true, channel: 'msedge' });
  }

  const errors = [];

  for (const vp of VIEWPORTS) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(`[${vp.name}] ${msg.text()}`);
    });
    page.on('pageerror', err => errors.push(`[${vp.name}] ${err.message}`));

    await page.goto('http://localhost:5173/ueno-saryo/', { waitUntil: 'networkidle' });
    // Wait for hero intro timeline to complete
    await page.waitForTimeout(2200);

    const screenshotPath = path.resolve(`test_screenshots/master_${vp.name}.png`);
    await page.screenshot({ path: screenshotPath });
    console.log(`✓ Captured: master_${vp.name}.png`);

    await page.close();
  }

  await browser.close();

  if (errors.length > 0) {
    console.log('Console Errors found:', errors);
  } else {
    console.log('✓ 0 Console errors detected across all viewports!');
  }
}

runVisualQA();
