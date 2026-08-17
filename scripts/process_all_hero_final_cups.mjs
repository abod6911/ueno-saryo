import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/abodv/.gemini/antigravity/brain/be5ca263-d9e3-4de4-b58b-20dd5275cfb9';

const FLAVORS = [
  {
    id: 'original',
    master: `${ARTIFACT_DIR}/master_original_1787001416662.jpg`,
    output: 'public/assets/products/hero-final/hero_matcha_original.png',
  },
  {
    id: 'strawberry',
    master: `${ARTIFACT_DIR}/master_strawberry_1787000660301.jpg`,
    output: 'public/assets/products/hero-final/hero_matcha_strawberry.png',
  },
  {
    id: 'blueberry',
    master: `${ARTIFACT_DIR}/master_blueberry_1787001479835.jpg`,
    output: 'public/assets/products/hero-final/hero_matcha_blueberry.png',
  },
  {
    id: 'mango',
    master: `${ARTIFACT_DIR}/master_mango_1787001546978.jpg`,
    output: 'public/assets/products/hero-final/hero_matcha_mango.png',
  },
  {
    id: 'cranberry',
    master: `${ARTIFACT_DIR}/master_cranberry_1787001614194.jpg`,
    output: 'public/assets/products/hero-final/hero_matcha_cranberry.png',
  },
];

async function processAllHeroCups() {
  console.log('=== STRICT PHYSICAL GEOMETRY SEGMENTATION ===');
  fs.mkdirSync('public/assets/products/hero-final', { recursive: true });

  const browser = await chromium.launch({ headless: true, channel: 'chrome' });

  for (const flavor of FLAVORS) {
    console.log(`Processing flavor: ${flavor.id}...`);
    const page = await browser.newPage();
    const rawB64 = `data:image/jpeg;base64,${fs.readFileSync(flavor.master).toString('base64')}`;

    const resultPngB64 = await page.evaluate(async (src) => {
      const img = new Image();
      img.src = src;
      await new Promise((resolve) => { img.onload = resolve; });

      const w = img.naturalWidth;
      const h = img.naturalHeight;

      const cvs = document.createElement('canvas');
      cvs.width = w;
      cvs.height = h;
      const ctx = cvs.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;

      // Build physical envelope for all 3 regions:
      const envMinX = new Int32Array(h).fill(w);
      const envMaxX = new Int32Array(h).fill(-1);

      // 1. Region A: Straw (y = 80 to y = 360)
      // The straw is an angled glass cylinder: x ~ 630 at y=80, x ~ 565 at y=360, width ~ 55px
      for (let y = 80; y < 360; y++) {
        const prog = (y - 80) / (360 - 80);
        const strawCenterX = 645 - prog * 70; // 645 to 575
        let minX = -1, maxX = -1;
        for (let x = Math.round(strawCenterX - 35); x <= Math.round(strawCenterX + 35); x++) {
          const idx = (y * w + x) * 4;
          const r = data[idx], g = data[idx + 1], b = data[idx + 2];
          const diff = Math.max(r, g, b) - Math.min(r, g, b);
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          if (diff > 8 || lum > 100) {
            if (minX === -1) minX = x;
            maxX = x;
          }
        }
        if (minX !== -1 && maxX !== -1) {
          envMinX[y] = minX - 1;
          envMaxX[y] = maxX + 1;
        } else {
          envMinX[y] = Math.round(strawCenterX - 24);
          envMaxX[y] = Math.round(strawCenterX + 24);
        }
      }

      // 2. Region B: Transparent Lid Rim (y = 360 to y = 460)
      // Lid spans from x ~ 200 to x ~ 685
      for (let y = 360; y < 460; y++) {
        const prog = (y - 360) / (460 - 360);
        // Elliptical lid top curve to outer flange
        const lidHalfW = 200 + prog * 44; // 200 to 244 (width: 400 to 488)
        envMinX[y] = Math.round(444 - lidHalfW);
        envMaxX[y] = Math.round(444 + lidHalfW);
      }

      // 3. Region C: Conical Cup Body (y = 460 to y = 1005)
      const baseEndY = 1005;
      for (let y = 460; y <= baseEndY; y++) {
        const prog = (y - 460) / (baseEndY - 460);
        envMinX[y] = Math.round(222 + prog * 68); // 222 to 290
        envMaxX[y] = Math.round(670 - prog * 68); // 670 to 602
      }

      // 4. Output with Smooth Sub-pixel Anti-Aliasing
      const outImgData = ctx.createImageData(w, h);
      const out = outImgData.data;

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = y * w + x;
          const p = i * 4;
          const r = data[p];
          const g = data[p + 1];
          const b = data[p + 2];

          if (y < 80 || y > baseEndY || envMinX[y] >= envMaxX[y] || x < envMinX[y] || x > envMaxX[y]) {
            out[p] = 0;
            out[p + 1] = 0;
            out[p + 2] = 0;
            out[p + 3] = 0;
          } else {
            const distToLeft = x - envMinX[y];
            const distToRight = envMaxX[y] - x;
            const distToTop = y - 80;
            const distToBottom = baseEndY - y;
            const edgeDist = Math.min(distToLeft, distToRight, distToTop, distToBottom);

            let alpha = 255;
            if (edgeDist < 3) {
              const t = Math.max(0, Math.min(1, edgeDist / 3));
              alpha = Math.round(t * 255);
            }

            out[p] = r;
            out[p + 1] = g;
            out[p + 2] = b;
            out[p + 3] = alpha;
          }
        }
      }

      ctx.putImageData(outImgData, 0, 0);

      // 5. Normalized standard canvas: 896 × 1200
      let minX = w, minY = h, maxX = 0, maxY = 0;
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const a = out[(y * w + x) * 4 + 3];
          if (a > 15) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }

      const targetW = 896;
      const targetH = 1200;
      const targetCvs = document.createElement('canvas');
      targetCvs.width = targetW;
      targetCvs.height = targetH;
      const targetCtx = targetCvs.getContext('2d');
      targetCtx.imageSmoothingEnabled = true;
      targetCtx.imageSmoothingQuality = 'high';

      const bboxW = maxX - minX;
      const bboxH = maxY - minY;

      const scale = 570 / bboxW;
      const drawW = bboxW * scale;
      const drawH = bboxH * scale;
      const drawX = (targetW - drawW) / 2;
      const drawY = 1040 - drawH;

      targetCtx.drawImage(cvs, minX, minY, bboxW, bboxH, drawX, drawY, drawW, drawH);

      return targetCvs.toDataURL('image/png');
    }, rawB64);

    const base64Data = resultPngB64.replace(/^data:image\/png;base64,/, '');
    fs.writeFileSync(flavor.output, Buffer.from(base64Data, 'base64'));
    console.log(`   ✓ Saved: ${flavor.output}`);
    await page.close();
  }

  await browser.close();
  console.log('\n✓ All 5 Hero final cup assets segmented with strict physical geometry!');
}

processAllHeroCups();
