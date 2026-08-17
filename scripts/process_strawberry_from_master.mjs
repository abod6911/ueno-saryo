import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const MASTER_STRAWBERRY = 'C:/Users/abodv/.gemini/antigravity/brain/be5ca263-d9e3-4de4-b58b-20dd5275cfb9/master_strawberry_1787000660301.jpg';

async function processStrawberry() {
  console.log('=== EXTRACTING STRAWBERRY MASTER WITH CLEAN BASE AND LID CONTAMINATION REMOVAL ===');

  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const page = await browser.newPage();
  const rawB64 = `data:image/jpeg;base64,${fs.readFileSync(MASTER_STRAWBERRY).toString('base64')}`;

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

    // 1. Identify Background vs Product
    const isBg = new Uint8Array(w * h);

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = y * w + x;
        const p = i * 4;
        const r = data[p];
        const g = data[p + 1];
        const b = data[p + 2];

        const maxC = Math.max(r, g, b);
        const minC = Math.min(r, g, b);
        const diff = maxC - minC;
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;

        // Neutral dark charcoal backdrop OR floor shadow below cup base (y > 1042)
        if (y > 1044) {
          isBg[i] = 1;
        } else if (y > 1030 && lum < 80 && diff < 22) {
          // Bottom corner shadow
          isBg[i] = 1;
        } else if (lum < 118 && diff < 15) {
          isBg[i] = 1;
        }
      }
    }

    // 2. Flood Fill from image borders
    const exteriorBg = new Uint8Array(w * h);
    const queue = new Int32Array(w * h);
    let qHead = 0;
    let qTail = 0;

    for (let x = 0; x < w; x++) {
      if (isBg[x]) { exteriorBg[x] = 1; queue[qTail++] = x; }
      const bIdx = (h - 1) * w + x;
      if (isBg[bIdx]) { exteriorBg[bIdx] = 1; queue[qTail++] = bIdx; }
    }
    for (let y = 0; y < h; y++) {
      const lIdx = y * w;
      if (isBg[lIdx] && !exteriorBg[lIdx]) { exteriorBg[lIdx] = 1; queue[qTail++] = lIdx; }
      const rIdx = y * w + (w - 1);
      if (isBg[rIdx] && !exteriorBg[rIdx]) { exteriorBg[rIdx] = 1; queue[qTail++] = rIdx; }
    }

    while (qHead < qTail) {
      const curr = queue[qHead++];
      const cx = curr % w;
      const cy = Math.floor(curr / w);

      const neighbors = [
        cx > 0 ? curr - 1 : -1,
        cx < w - 1 ? curr + 1 : -1,
        cy > 0 ? curr - w : -1,
        cy < h - 1 ? curr + w : -1,
      ];

      for (const n of neighbors) {
        if (n !== -1 && !exteriorBg[n] && isBg[n]) {
          exteriorBg[n] = 1;
          queue[qTail++] = n;
        }
      }
    }

    // 3. Compute Output Image with Edge Anti-Aliasing
    const outImgData = ctx.createImageData(w, h);
    const out = outImgData.data;

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = y * w + x;
        const p = i * 4;
        const r = data[p];
        const g = data[p + 1];
        const b = data[p + 2];

        if (exteriorBg[i]) {
          out[p] = 0;
          out[p + 1] = 0;
          out[p + 2] = 0;
          out[p + 3] = 0;
        } else {
          // Check edge transition
          let hasExteriorNeighbor = false;
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              const ny = y + dy;
              const nx = x + dx;
              if (ny >= 0 && ny < h && nx >= 0 && nx < w) {
                if (exteriorBg[ny * w + nx]) {
                  hasExteriorNeighbor = true;
                }
              }
            }
          }

          if (hasExteriorNeighbor) {
            const lum = 0.299 * r + 0.587 * g + 0.114 * b;
            const diff = Math.max(r, g, b) - Math.min(r, g, b);
            let alpha = 255;
            if (lum < 140 && diff < 20) {
              const t = Math.max(0, Math.min(1, (lum - 60) / 70));
              alpha = Math.round(t * 255);
            }
            out[p] = r;
            out[p + 1] = g;
            out[p + 2] = b;
            out[p + 3] = alpha;
          } else {
            out[p] = r;
            out[p + 1] = g;
            out[p + 2] = b;
            out[p + 3] = 255;
          }
        }
      }
    }

    ctx.putImageData(outImgData, 0, 0);

    // 4. Find tight bounding box of true product
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

    // 5. Master Canvas Normalization: 896 × 1200
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
  fs.mkdirSync('public/assets/products/hero-final', { recursive: true });
  fs.writeFileSync('public/assets/products/hero-final/hero_matcha_strawberry.png', Buffer.from(base64Data, 'base64'));

  console.log('✓ Successfully saved: public/assets/products/hero-final/hero_matcha_strawberry.png');
  await browser.close();
}

processStrawberry();
