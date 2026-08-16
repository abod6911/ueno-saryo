import { chromium } from 'playwright';
import path from 'path';

async function captureCupEdgeZoom() {
  let browser;
  try {
    browser = await chromium.launch({ headless: true, channel: 'chrome' });
  } catch (e) {
    browser = await chromium.launch({ headless: true, channel: 'msedge' });
  }
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1200, height: 1200 });

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            margin: 0;
            padding: 40px;
            background: #122416; /* Hero background green */
            font-family: sans-serif;
            color: white;
          }
          .grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
          }
          .card {
            background: #19321d;
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 16px;
            padding: 16px;
            text-align: center;
          }
          .card img {
            width: 100%;
            height: 350px;
            object-fit: contain;
          }
          .label {
            font-size: 14px;
            margin-top: 10px;
            color: #939458;
          }
        </style>
      </head>
      <body>
        <h1>Hero Cup Edge & Transparency Inspector</h1>
        <div class="grid">
          <div class="card">
            <img src="http://localhost:5173/assets/products/cup_clean_original.png" />
            <div class="label">Original Matcha</div>
          </div>
          <div class="card">
            <img src="http://localhost:5173/assets/products/cup_clean_strawberry.png" />
            <div class="label">Strawberry Matcha</div>
          </div>
          <div class="card">
            <img src="http://localhost:5173/assets/products/cup_clean_blueberry.png" />
            <div class="label">Blueberry Matcha</div>
          </div>
          <div class="card">
            <img src="http://localhost:5173/assets/products/cup_clean_mango.png" />
            <div class="label">Mango Matcha</div>
          </div>
        </div>
      </body>
    </html>
  `;

  await page.setContent(html);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.resolve('test_screenshots/hero_cups_inspection.png') });
  console.log('Saved test_screenshots/hero_cups_inspection.png');

  await browser.close();
}

captureCupEdgeZoom();
