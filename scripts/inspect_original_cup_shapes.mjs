import { chromium } from 'playwright';
import path from 'path';

async function inspectOriginalCupShapes() {
  let browser;
  try {
    browser = await chromium.launch({ headless: true, channel: 'chrome' });
  } catch (e) {
    browser = await chromium.launch({ headless: true, channel: 'msedge' });
  }
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1200, height: 800 });

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            margin: 0;
            padding: 30px;
            background: #ff00ff; /* Bright magenta to clearly see alpha & edges */
            font-family: sans-serif;
          }
          .grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
          }
          .card {
            background: rgba(255,255,255,0.2);
            padding: 10px;
            text-align: center;
          }
          .card img {
            width: 100%;
            height: 380px;
            object-fit: contain;
          }
        </style>
      </head>
      <body>
        <div class="grid">
          <div class="card"><img src="http://localhost:5173/assets/products/drink_original.png" /><div>drink_original</div></div>
          <div class="card"><img src="http://localhost:5173/assets/products/drink_strawberry.png" /><div>drink_strawberry</div></div>
          <div class="card"><img src="http://localhost:5173/assets/products/drink_blueberry.png" /><div>drink_blueberry</div></div>
          <div class="card"><img src="http://localhost:5173/assets/products/drink_cranberry.png" /><div>drink_cranberry</div></div>
        </div>
      </body>
    </html>
  `;

  await page.setContent(html);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.resolve('test_screenshots/original_cup_magenta.png') });
  console.log('Saved test_screenshots/original_cup_magenta.png');
  await browser.close();
}

inspectOriginalCupShapes();
