import { chromium } from 'playwright';

async function checkDrinkPng() {
  let browser;
  try {
    browser = await chromium.launch({ headless: true, channel: 'chrome' });
  } catch (e) {
    browser = await chromium.launch({ headless: true, channel: 'msedge' });
  }
  const page = await browser.newPage();
  const info = await page.evaluate(async () => {
    const img = new Image();
    img.src = 'http://localhost:5173/assets/products/drink_original.png';
    await new Promise((r) => { img.onload = r; });
    return { w: img.naturalWidth, h: img.naturalHeight };
  });
  console.log('drink_original size:', info);
  await browser.close();
}

checkDrinkPng();
