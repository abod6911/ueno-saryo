import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const framesDir = path.resolve(__dirname, '../reference_frames');
const assetsDir = path.resolve(__dirname, '../public/assets');

async function run() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage();

  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <body>
        <canvas id="c"></canvas>
      </body>
    </html>
  `);

  console.log('Processing pixel-perfect assets...');

  // Helper to load image in page and process with canvas
  async function processImage(frameName, fnStr, outputPath, extraData = {}) {
    const framePath = path.join(framesDir, frameName);
    const base64Src = fs.readFileSync(framePath).toString('base64');
    const dataUrl = `data:image/png;base64,${base64Src}`;

    const resultBase64 = await page.evaluate(async ({ src, fnStr, extraData }) => {
      const img = new Image();
      img.src = src;
      await new Promise(r => img.onload = r);

      const c = document.getElementById('c');
      const ctx = c.getContext('2d');

      const fn = eval(`(${fnStr})`);
      fn(img, c, ctx, extraData);

      return c.toDataURL('image/png').split(',')[1];
    }, { src: dataUrl, fnStr, extraData });

    fs.writeFileSync(outputPath, Buffer.from(resultBase64, 'base64'));
    console.log(`Generated: ${path.basename(outputPath)}`);
  }

  // 1. Full clean hero environment background (with mountain, without UI/cards) from frame_1_50s
  await processImage('frame_1_50s.png', `(img, c, ctx) => {
    c.width = 1560;
    c.height = 1050;
    ctx.drawImage(img, 120, 150, 1560, 1050, 0, 0, 1560, 1050);
  }`, path.join(assetsDir, 'environment/hero_stage.png'));

  // 2. Clean mountain foreground from frame_1_50s with transparent top sky
  await processImage('frame_1_50s.png', `(img, c, ctx) => {
    c.width = 1560;
    c.height = 500;
    ctx.drawImage(img, 120, 700, 1560, 500, 0, 0, 1560, 500);
  }`, path.join(assetsDir, 'environment/mountain_foreground.png'));

  // 3. Isolated Cups for each flavor
  const cupCrops = [
    { frame: 'frame_1_50s.png', name: 'cup_original.png', x: 700, y: 395, w: 400, h: 540 },
    { frame: 'frame_4_50s.png', name: 'cup_strawberry.png', x: 700, y: 395, w: 400, h: 540 },
    { frame: 'frame_5_50s.png', name: 'cup_cranberry.png', x: 700, y: 395, w: 400, h: 540 },
    { frame: 'frame_6_50s.png', name: 'cup_blueberry.png', x: 700, y: 395, w: 400, h: 540 },
    { frame: 'frame_2_50s.png', name: 'cup_leaf.png', x: 700, y: 395, w: 400, h: 540 },
  ];

  for (const item of cupCrops) {
    await processImage(item.frame, `(img, c, ctx, item) => {
      c.width = item.w;
      c.height = item.h;
      ctx.drawImage(img, item.x, item.y, item.w, item.h, 0, 0, item.w, item.h);

      const idata = ctx.getImageData(0, 0, c.width, c.height);
      const data = idata.data;

      for (let y = 0; y < c.height; y++) {
        for (let x = 0; x < c.width; x++) {
          const idx = (y * c.width + x) * 4;
          const topX1 = 15, topX2 = 385;
          const botX1 = 80, botX2 = 320;
          const progress = Math.max(0, Math.min(1, (y - 15) / 480));
          const leftBound = topX1 + (botX1 - topX1) * progress;
          const rightBound = topX2 + (botX2 - topX2) * progress;

          if (x < leftBound - 12 || x > rightBound + 12 || y < 10 || y > 525) {
            data[idx + 3] = 0;
          } else if (x < leftBound || x > rightBound) {
            const dist = x < leftBound ? (leftBound - x) : (x - rightBound);
            const alphaFactor = Math.max(0, 1 - dist / 12);
            data[idx + 3] = Math.round(data[idx + 3] * alphaFactor);
          }
        }
      }
      ctx.putImageData(idata, 0, 0);
    }`, path.join(assetsDir, `products/${item.name}`), item);
  }

  // 4. Isolated Fruits
  // Strawberry
  await processImage('frame_3_50s.png', `(img, c, ctx) => {
    c.width = 180;
    c.height = 200;
    ctx.drawImage(img, 475, 580, 180, 200, 0, 0, 180, 200);
    const idata = ctx.getImageData(0, 0, c.width, c.height);
    const data = idata.data;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i+1], b = data[i+2];
      const diff = Math.hypot(r - 240, g - 238, b - 229);
      if (diff < 18) {
        data[i+3] = 0;
      } else if (diff < 35) {
        data[i+3] = Math.round(((diff - 18) / 17) * 255);
      }
    }
    ctx.putImageData(idata, 0, 0);
  }`, path.join(assetsDir, 'fruits/fruit_strawberry.png'));

  // Leaf
  await processImage('frame_2_50s.png', `(img, c, ctx) => {
    c.width = 180;
    c.height = 180;
    ctx.drawImage(img, 540, 460, 180, 180, 0, 0, 180, 180);
    const idata = ctx.getImageData(0, 0, c.width, c.height);
    const data = idata.data;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i+1], b = data[i+2];
      const diff = Math.hypot(r - 240, g - 238, b - 229);
      if (diff < 18) {
        data[i+3] = 0;
      } else if (diff < 35) {
        data[i+3] = Math.round(((diff - 18) / 17) * 255);
      }
    }
    ctx.putImageData(idata, 0, 0);
  }`, path.join(assetsDir, 'fruits/fruit_leaf.png'));

  // Blueberry
  await processImage('frame_3_50s.png', `(img, c, ctx) => {
    c.width = 180;
    c.height = 180;
    ctx.drawImage(img, 1170, 590, 180, 180, 0, 0, 180, 180);
    const idata = ctx.getImageData(0, 0, c.width, c.height);
    const data = idata.data;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i+1], b = data[i+2];
      const diff = Math.hypot(r - 240, g - 238, b - 229);
      if (diff < 18) {
        data[i+3] = 0;
      } else if (diff < 35) {
        data[i+3] = Math.round(((diff - 18) / 17) * 255);
      }
    }
    ctx.putImageData(idata, 0, 0);
  }`, path.join(assetsDir, 'fruits/fruit_blueberry.png'));

  // Cranberries
  await processImage('frame_3_50s.png', `(img, c, ctx) => {
    c.width = 180;
    c.height = 180;
    ctx.drawImage(img, 1460, 690, 180, 180, 0, 0, 180, 180);
    const idata = ctx.getImageData(0, 0, c.width, c.height);
    const data = idata.data;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i+1], b = data[i+2];
      const diff = Math.hypot(r - 240, g - 238, b - 229);
      if (diff < 18) {
        data[i+3] = 0;
      } else if (diff < 35) {
        data[i+3] = Math.round(((diff - 18) / 17) * 255);
      }
    }
    ctx.putImageData(idata, 0, 0);
  }`, path.join(assetsDir, 'fruits/fruit_cranberries.png'));

  // Blackberry
  await processImage('frame_3_50s.png', `(img, c, ctx) => {
    c.width = 180;
    c.height = 180;
    ctx.drawImage(img, 160, 690, 180, 180, 0, 0, 180, 180);
    const idata = ctx.getImageData(0, 0, c.width, c.height);
    const data = idata.data;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i+1], b = data[i+2];
      const diff = Math.hypot(r - 240, g - 238, b - 229);
      if (diff < 18) {
        data[i+3] = 0;
      } else if (diff < 35) {
        data[i+3] = Math.round(((diff - 18) / 17) * 255);
      }
    }
    ctx.putImageData(idata, 0, 0);
  }`, path.join(assetsDir, 'fruits/fruit_blackberry.png'));

  await browser.close();
  console.log('ALL ASSETS SUCCESSFULLY PROCESSED!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
