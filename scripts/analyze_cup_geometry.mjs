import { chromium } from 'playwright';

async function analyzeCupGeometry() {
  let browser;
  try {
    browser = await chromium.launch({ headless: true, channel: 'chrome' });
  } catch (e) {
    browser = await chromium.launch({ headless: true, channel: 'msedge' });
  }
  const page = await browser.newPage();
  await page.goto('http://localhost:5173');

  const coords = await page.evaluate(async () => {
    const img = new Image();
    img.src = '/assets/products/drink_original.png';
    await new Promise((r) => { img.onload = r; });

    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // Let's inspect rows from top to bottom
    const { width, height } = canvas;
    const imgData = ctx.getImageData(0, 0, width, height);

    return { width, height };
  });

  console.log('Geometry analysis canvas dimensions:', coords);
  await browser.close();
}

analyzeCupGeometry();
