import { chromium } from 'playwright';
import path from 'path';

async function inspectCandidates() {
  let browser;
  try {
    browser = await chromium.launch({ headless: true, channel: 'chrome' });
  } catch (e) {
    browser = await chromium.launch({ headless: true, channel: 'msedge' });
  }
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1400, height: 1600 });

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
            grid-template-columns: repeat(4, 1fr);
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
            height: 260px;
            object-fit: contain;
            background: repeating-conic-gradient(#808080 0% 25%, #ffffff 0% 50%) 50% / 16px 16px;
          }
          .label {
            font-size: 12px;
            margin-top: 8px;
            color: #939458;
            word-break: break-all;
          }
        </style>
      </head>
      <body>
        <h2>Candidate Source Images Inspection</h2>
        <div class="grid">
          <div class="card"><img src="http://localhost:5173/assets/products/cup_original.png" /><div class="label">cup_original.png</div></div>
          <div class="card"><img src="http://localhost:5173/assets/products/cup_strawberry.png" /><div class="label">cup_strawberry.png</div></div>
          <div class="card"><img src="http://localhost:5173/assets/products/cup_blueberry.png" /><div class="label">cup_blueberry.png</div></div>
          <div class="card"><img src="http://localhost:5173/assets/products/cup_leaf.png" /><div class="label">cup_leaf.png</div></div>
          <div class="card"><img src="http://localhost:5173/assets/products/drink_original.png" /><div class="label">drink_original.png</div></div>
          <div class="card"><img src="http://localhost:5173/assets/products/drink_strawberry.png" /><div class="label">drink_strawberry.png</div></div>
          <div class="card"><img src="http://localhost:5173/assets/products/drink_blueberry.png" /><div class="label">drink_blueberry.png</div></div>
          <div class="card"><img src="http://localhost:5173/assets/products/drink_cranberry.png" /><div class="label">drink_cranberry.png</div></div>
          <div class="card"><img src="http://localhost:5173/assets/products/menu_matcha_latte.jpg" /><div class="label">menu_matcha_latte.jpg</div></div>
          <div class="card"><img src="http://localhost:5173/assets/products/menu_strawberry_matcha.jpg" /><div class="label">menu_strawberry_matcha.jpg</div></div>
          <div class="card"><img src="http://localhost:5173/assets/products/menu_blueberry_matcha.jpg" /><div class="label">menu_blueberry_matcha.jpg</div></div>
          <div class="card"><img src="http://localhost:5173/assets/products/menu_mango_matcha.jpg" /><div class="label">menu_mango_matcha.jpg</div></div>
        </div>
      </body>
    </html>
  `;

  await page.setContent(html);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.resolve('test_screenshots/candidate_sources.png') });
  console.log('Saved test_screenshots/candidate_sources.png');
  await browser.close();
}

inspectCandidates();
