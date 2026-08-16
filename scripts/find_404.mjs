import { chromium } from 'playwright';

async function checkAndroid404() {
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const page = await browser.newPage({
    viewport: { width: 360, height: 800 },
    hasTouch: true,
    isMobile: true,
  });

  page.on('response', res => {
    if (res.status() === 404) {
      console.log('404 URL:', res.url());
    }
  });

  await page.goto('http://localhost:5173/ueno-saryo/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await browser.close();
}

checkAndroid404();
