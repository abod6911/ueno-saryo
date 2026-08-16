import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const framesDir = path.resolve(__dirname, '../reference_frames');
const assetsDir = path.resolve(__dirname, '../public/assets');

fs.mkdirSync(path.join(assetsDir, 'products'), { recursive: true });
fs.mkdirSync(path.join(assetsDir, 'fruits'), { recursive: true });
fs.mkdirSync(path.join(assetsDir, 'environment'), { recursive: true });
fs.mkdirSync(path.join(assetsDir, 'ui'), { recursive: true });

async function run() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage();

  // Create an HTML canvas processor
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <body>
        <canvas id="c"></canvas>
      </body>
    </html>
  `);

  console.log('Extracting assets from frames...');

  // Helper to load image in page and process
  async function extractCrop(frameName, crop, outputPath, options = {}) {
    const framePath = path.join(framesDir, frameName);
    const base64Src = fs.readFileSync(framePath).toString('base64');
    const dataUrl = `data:image/png;base64,${base64Src}`;

    const resultBase64 = await page.evaluate(async ({ src, crop, options }) => {
      const img = new Image();
      img.src = src;
      await new Promise(r => img.onload = r);

      const c = document.getElementById('c');
      const ctx = c.getContext('2d');

      c.width = crop.w;
      c.height = crop.h;
      ctx.clearRect(0, 0, c.width, c.height);

      ctx.drawImage(img, crop.x, crop.y, crop.w, crop.h, 0, 0, crop.w, crop.h);

      // If chroma key or alpha masking is requested
      if (options.isolateProduct) {
        const idata = ctx.getImageData(0, 0, c.width, c.height);
        const data = idata.data;
        // Background color of the room is dark green ~ rgb(20..35, 40..60, 20..35)
        // Let's refine cup transparency
        ctx.putImageData(idata, 0, 0);
      }

      return c.toDataURL('image/png').split(',')[1];
    }, { src: dataUrl, crop, options });

    fs.writeFileSync(outputPath, Buffer.from(resultBase64, 'base64'));
    console.log(`Saved: ${path.basename(outputPath)}`);
  }

  // Reference frame coordinates (frame is 1800 x 1350):
  // Inner frame is roughly: x: 120, y: 175, w: 1560, h: 1050
  
  // 1. Environment / Landscape background
  // From frame_1_50s (when no cards and no text yet)
  await extractCrop(
    'frame_1_50s.png',
    { x: 110, y: 160, w: 1580, h: 1070 },
    path.join(assetsDir, 'environment/hero_bg_empty.png')
  );

  // Landscape base mountain from frame_1_50s
  await extractCrop(
    'frame_1_50s.png',
    { x: 110, y: 800, w: 1580, h: 430 },
    path.join(assetsDir, 'environment/mountain_base.png')
  );

  // 2. Drinks (Cups with transparent background / cutouts)
  // Original drink: frame_2_50s.png or frame_3_50s.png
  // Cup coordinate: x: ~710, y: ~400, w: ~380, h: ~540
  await extractCrop(
    'frame_3_50s.png',
    { x: 700, y: 395, w: 400, h: 540 },
    path.join(assetsDir, 'products/drink_original.png')
  );

  // Strawberry drink: frame_4_50s.png
  await extractCrop(
    'frame_4_50s.png',
    { x: 700, y: 395, w: 400, h: 540 },
    path.join(assetsDir, 'products/drink_strawberry.png')
  );

  // Cranberry drink: frame_5_50s.png
  await extractCrop(
    'frame_5_50s.png',
    { x: 700, y: 395, w: 400, h: 540 },
    path.join(assetsDir, 'products/drink_cranberry.png')
  );

  // Blueberry drink: frame_6_50s.png
  await extractCrop(
    'frame_6_50s.png',
    { x: 700, y: 395, w: 400, h: 540 },
    path.join(assetsDir, 'products/drink_blueberry.png')
  );

  // 3. Fruits (Individual ingredient cutouts from cards)
  // Strawberry from card
  await extractCrop(
    'frame_3_50s.png',
    { x: 418, y: 535, w: 295, h: 295 },
    path.join(assetsDir, 'fruits/card_strawberry.png')
  );

  // Leaf from card (frame_2_50s.png or frame_4_50s.png)
  await extractCrop(
    'frame_2_50s.png',
    { x: 500, y: 420, w: 260, h: 260 },
    path.join(assetsDir, 'fruits/card_leaf.png')
  );

  // Blueberry from card (frame_3_50s.png)
  await extractCrop(
    'frame_3_50s.png',
    { x: 1115, y: 535, w: 295, h: 295 },
    path.join(assetsDir, 'fruits/card_blueberry.png')
  );

  // Cranberries from card (frame_3_50s.png)
  await extractCrop(
    'frame_3_50s.png',
    { x: 1420, y: 650, w: 260, h: 260 },
    path.join(assetsDir, 'fruits/card_cranberries.png')
  );

  // Blackberry from card (frame_3_50s.png)
  await extractCrop(
    'frame_3_50s.png',
    { x: 120, y: 650, w: 260, h: 260 },
    path.join(assetsDir, 'fruits/card_blackberry.png')
  );

  // 4. Logo 'kumo'
  await extractCrop(
    'frame_3_50s.png',
    { x: 165, y: 220, w: 120, h: 50 },
    path.join(assetsDir, 'ui/logo_kumo.png')
  );

  // Price cart tag
  await extractCrop(
    'frame_3_50s.png',
    { x: 840, y: 865, w: 120, h: 140 },
    path.join(assetsDir, 'ui/price_tag.png')
  );

  await browser.close();
  console.log('All initial asset crops generated successfully!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
