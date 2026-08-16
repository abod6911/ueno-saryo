import { chromium } from 'playwright';
import path from 'path';

async function captureBaseline() {
  let browser;
  try {
    browser = await chromium.launch({ headless: true, channel: 'chrome' });
  } catch (e) {
    browser = await chromium.launch({ headless: true, channel: 'msedge' });
  }

  // Desktop 1440x900
  const pageDesktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pageDesktop.goto('http://localhost:5173/ueno-saryo/', { waitUntil: 'networkidle' });
  await pageDesktop.waitForTimeout(1000);
  await pageDesktop.screenshot({ path: path.resolve('test_screenshots/baseline_1440x900.png') });

  // Mobile 390x844
  const pageMobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await pageMobile.goto('http://localhost:5173/ueno-saryo/', { waitUntil: 'networkidle' });
  await pageMobile.waitForTimeout(1000);
  await pageMobile.screenshot({ path: path.resolve('test_screenshots/baseline_390x844.png') });

  console.log('Baseline screenshots saved.');
  await browser.close();
}

captureBaseline();
