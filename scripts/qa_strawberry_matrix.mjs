import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const STRAWBERRY_FINAL = 'public/assets/products/hero-final/hero_matcha_strawberry.png';

const BACKGROUNDS = [
  { name: 'CHECKERBOARD', css: 'background-image: repeating-conic-gradient(#808080 0% 25%, #ffffff 0% 50%); background-size: 24px 24px;' },
  { name: 'PURE_BLACK', css: 'background-color: #000000;' },
  { name: 'PURE_WHITE', css: 'background-color: #ffffff;' },
  { name: 'UENO_GREEN', css: 'background-color: #122416;' },
  { name: 'MAGENTA', css: 'background-color: #ff00ff;' },
  { name: 'MID_GRAY', css: 'background-color: #808080;' },
];

async function runStrawberryQA() {
  let browser;
  try {
    browser = await chromium.launch({ headless: true, channel: 'msedge' });
  } catch (e) {
    browser = await chromium.launch({ headless: true, channel: 'chrome' });
  }

  const page = await browser.newPage({ viewport: { width: 1800, height: 2200 } });
  const imgB64 = `data:image/png;base64,${fs.readFileSync(STRAWBERRY_FINAL).toString('base64')}`;

  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Strawberry Master Alpha QA Matrix</title>
      <style>
        body { margin: 0; padding: 30px; font-family: system-ui; background: #1a1a1a; color: #fff; }
        h1 { font-size: 24px; margin-bottom: 8px; }
        p { color: #aaa; font-size: 13px; margin-bottom: 24px; }
        .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 40px; }
        .qa-card { border: 1px solid #333; border-radius: 16px; padding: 16px; background: #242424; }
        .qa-card h3 { margin: 0 0 12px 0; font-size: 14px; font-mono; color: #939458; }
        .canvas-box { width: 100%; height: 500px; display: flex; align-items: center; justify-content: center; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); }
        .canvas-box img { max-width: 95%; max-height: 95%; object-fit: contain; }
        .zoom-row { display: flex; gap: 20px; margin-top: 30px; }
        .zoom-card { flex: 1; border: 1px solid #333; border-radius: 16px; padding: 16px; background: #242424; }
        .zoom-box { height: 420px; overflow: hidden; display: flex; align-items: center; justify-content: center; border-radius: 12px; }
      </style>
    </head>
    <body>
      <h1>🍓 Strawberry Hero Cup Master Alpha QA Matrix (100% Raw Rebuilt)</h1>
      <p>Diagnostic validation across 6 high-contrast backgrounds to guarantee ZERO white hood, ZERO lower rectangle, intact glass straw, and clean specular plastic reflections.</p>

      <div class="grid">
  `;

  for (const bg of BACKGROUNDS) {
    html += `
      <div class="qa-card">
        <h3>${bg.name}</h3>
        <div class="canvas-box" style="${bg.css}">
          <img src="${imgB64}" alt="Strawberry ${bg.name}" />
        </div>
      </div>
    `;
  }

  html += `
      </div>
      <h2>🔍 Zoom Quality Check (200% Zoom on Critical Regions: Straw, Lid, Lower Base)</h2>
      <div class="zoom-row">
        <div class="zoom-card">
          <h3>200% Zoom: Straw & Clear Lid on Magenta</h3>
          <div class="zoom-box" style="background-color: #ff00ff;">
            <img src="${imgB64}" style="transform: scale(2.2) translateY(120px);" />
          </div>
        </div>
        <div class="zoom-card">
          <h3>200% Zoom: Straw & Clear Lid on Ueno Dark Green</h3>
          <div class="zoom-box" style="background-color: #122416;">
            <img src="${imgB64}" style="transform: scale(2.2) translateY(120px);" />
          </div>
        </div>
        <div class="zoom-card">
          <h3>200% Zoom: Lower Compote Base on Pure Black</h3>
          <div class="zoom-box" style="background-color: #000000;">
            <img src="${imgB64}" style="transform: scale(2.2) translateY(-140px);" />
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  await page.setContent(html);
  await page.waitForTimeout(1000);

  fs.mkdirSync('test_screenshots', { recursive: true });
  await page.screenshot({
    path: path.resolve('test_screenshots/qa_strawberry_master_matrix.png'),
    fullPage: true,
  });

  console.log('✓ Strawberry Master QA Matrix captured to test_screenshots/qa_strawberry_master_matrix.png');
  await browser.close();
}

runStrawberryQA();
