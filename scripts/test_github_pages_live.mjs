import { chromium } from 'playwright';
import path from 'path';

async function testGitHubPagesLive() {
  let browser;
  try {
    browser = await chromium.launch({ headless: true, channel: 'chrome' });
  } catch (e) {
    browser = await chromium.launch({ headless: true, channel: 'msedge' });
  }
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  console.log('Navigating to GitHub Pages...');
  await page.goto('https://abod6911.github.io/ueno-saryo/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  await page.screenshot({ path: path.resolve('test_screenshots/github_pages_live.png') });
  console.log('Screenshot saved to test_screenshots/github_pages_live.png');

  await browser.close();
}

testGitHubPagesLive();
