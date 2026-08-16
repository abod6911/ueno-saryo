import { chromium } from 'playwright';
import path from 'path';

async function inspectRaw() {
  let browser;
  try {
    browser = await chromium.launch({ headless: true, channel: 'chrome' });
  } catch (e) {
    browser = await chromium.launch({ headless: true, channel: 'msedge' });
  }
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1400, height: 1000 });

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            margin: 0;
            padding: 30px;
            background: #122416;
            font-family: sans-serif;
            color: white;
          }
          .grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 16px;
          }
          .card {
            background: #19321d;
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 12px;
            padding: 12px;
            text-align: center;
          }
          .card img {
            width: 100%;
            height: 240px;
            object-fit: contain;
          }
          .label {
            font-size: 12px;
            margin-top: 8px;
            color: #939458;
          }
        </style>
      </head>
      <body>
        <h2>Raw Drinks Inspection</h2>
        <div class="grid">
          <div class="card"><img src="http://localhost:5173/assets/products/raw_matcha_latte_1.jpg" /><div class="label">raw_matcha_latte_1</div></div>
          <div class="card"><img src="http://localhost:5173/assets/products/raw_matcha_latte_2.jpg" /><div class="label">raw_matcha_latte_2</div></div>
          <div class="card"><img src="http://localhost:5173/assets/products/raw_strawberry_matcha.jpg" /><div class="label">raw_strawberry_matcha</div></div>
          <div class="card"><img src="http://localhost:5173/assets/products/raw_blueberry_matcha.jpg" /><div class="label">raw_blueberry_matcha</div></div>
          <div class="card"><img src="http://localhost:5173/assets/products/raw_mango_matcha.jpg" /><div class="label">raw_mango_matcha</div></div>
        </div>
      </body>
    </html>
  `;

  await page.setContent(html);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.resolve('test_screenshots/raw_drinks_inspection.png') });
  console.log('Saved test_screenshots/raw_drinks_inspection.png');
  await browser.close();
}

inspectRaw();
