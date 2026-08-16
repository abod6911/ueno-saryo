import { chromium } from 'playwright';

async function checkMenuImages() {
  let browser;
  try {
    browser = await chromium.launch({ headless: true, channel: 'chrome' });
  } catch (e) {
    browser = await chromium.launch({ headless: true, channel: 'msedge' });
  }
  const page = await browser.newPage();
  await page.goto('http://localhost:5173');
  const info = await page.evaluate(async () => {
    const list = [
      '/assets/products/menu_matcha_latte.jpg',
      '/assets/products/menu_strawberry_matcha.jpg',
      '/assets/products/menu_blueberry_matcha.jpg',
      '/assets/products/menu_mango_matcha.jpg',
    ];
    const results = {};
    for (const src of list) {
      const img = new Image();
      img.src = src;
      await new Promise((r) => { img.onload = r; });
      results[src] = { w: img.naturalWidth, h: img.naturalHeight };
    }
    return results;
  });
  console.log('Menu images sizes:', info);
  await browser.close();
}

checkMenuImages();
