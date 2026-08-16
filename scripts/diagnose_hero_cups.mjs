import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function diagnose() {
  let browser;
  try {
    browser = await chromium.launch({ headless: true, channel: 'msedge' });
  } catch (e) {
    browser = await chromium.launch({ headless: true, channel: 'chrome' });
  }
  const page = await browser.newPage();

  const files = [
    'public/assets/products/cup_clean_original.png',
    'public/assets/products/cup_clean_strawberry.png',
    'public/assets/products/cup_clean_blueberry.png',
    'public/assets/products/cup_clean_mango.png',
  ];

  console.log('--- Inspecting Hero Product PNGs ---');

  for (const f of files) {
    const absPath = path.resolve(f);
    if (!fs.existsSync(absPath)) {
      console.log(`File not found: ${f}`);
      continue;
    }
    const dataUrl = `data:image/png;base64,${fs.readFileSync(absPath).toString('base64')}`;

    const info = await page.evaluate(async (src) => {
      const img = new Image();
      img.src = src;
      await new Promise((r) => { img.onload = r; });

      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const { data, width, height } = imgData;

      let minX = width, minY = height, maxX = 0, maxY = 0;
      let opaqueCount = 0;
      let semiCount = 0;
      let transparentCount = 0;
      let cornerAlphas = [
        data[3],
        data[(width - 1) * 4 + 3],
        data[(height - 1) * width * 4 + 3],
        data[(height * width - 1) * 4 + 3],
      ];

      let topRowNonZero = 0;
      let bottomRowNonZero = 0;
      let leftColNonZero = 0;
      let rightColNonZero = 0;

      for (let x = 0; x < width; x++) {
        if (data[x * 4 + 3] > 0) topRowNonZero++;
        if (data[((height - 1) * width + x) * 4 + 3] > 0) bottomRowNonZero++;
      }
      for (let y = 0; y < height; y++) {
        if (data[(y * width) * 4 + 3] > 0) leftColNonZero++;
        if (data[(y * width + width - 1) * 4 + 3] > 0) rightColNonZero++;
      }

      // Sample non-zero alpha near the top/bottom 15% and sides
      let lightGrayFringePixels = 0;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = (y * width + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3];

          if (a === 0) {
            transparentCount++;
          } else {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;

            if (a > 245) opaqueCount++;
            else semiCount++;

            // If almost grayscale light pixel with semi or full alpha
            const diff = Math.max(Math.abs(r - g), Math.abs(r - b), Math.abs(g - b));
            if (diff < 20 && r > 160 && g > 160 && b > 160) {
              lightGrayFringePixels++;
            }
          }
        }
      }

      return {
        width,
        height,
        bounds: { minX, minY, maxX, maxY, w: maxX - minX, h: maxY - minY },
        cornerAlphas,
        topRowNonZero,
        bottomRowNonZero,
        leftColNonZero,
        rightColNonZero,
        transparentCount,
        semiCount,
        opaqueCount,
        lightGrayFringePixels,
      };
    }, dataUrl);

    console.log(`\nFile: ${f}`);
    console.log(`Size: ${info.width}x${info.height}`);
    console.log(`Bounds: [${info.bounds.minX}, ${info.bounds.minY}] to [${info.bounds.maxX}, ${info.bounds.maxY}] (${info.bounds.w}x${info.bounds.h})`);
    console.log(`Corners alpha: ${JSON.stringify(info.cornerAlphas)}`);
    console.log(`Border non-zero: Top=${info.topRowNonZero}, Bottom=${info.bottomRowNonZero}, Left=${info.leftColNonZero}, Right=${info.rightColNonZero}`);
    console.log(`Counts: Transp=${info.transparentCount}, Semi=${info.semiCount}, Opaque=${info.opaqueCount}`);
    console.log(`Light gray fringe pixels: ${info.lightGrayFringePixels}`);
  }

  await browser.close();
}

diagnose();
