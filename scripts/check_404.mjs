import { chromium } from 'playwright';

async function check404() {
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  
  page.on('response', res => {
    if (res.status() === 404) {
      console.log('404 URL:', res.url());
    }
  });

  await page.goto('http://localhost:5173/ueno-saryo/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await browser.close();
}

check404();
