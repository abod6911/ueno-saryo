import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/abodv/.gemini/antigravity/brain/be5ca263-d9e3-4de4-b58b-20dd5275cfb9';
const RAW_STRAWBERRY = `${ARTIFACT_DIR}/real_strawberry_matcha_1786988702090.jpg`;

async function processStrawberryMaster() {
  console.log('=== STEP 1: PROCESSING STRAWBERRY MASTER FROM RAW SOURCE ===');
  
  if (!fs.existsSync(RAW_STRAWBERRY)) {
    console.error(`Raw source not found: ${RAW_STRAWBERRY}`);
    process.exit(1);
  }

  let browser;
  try {
    browser = await chromium.launch({ headless: true, channel: 'msedge' });
  } catch (e) {
    browser = await chromium.launch({ headless: true, channel: 'chrome' });
  }

  const page = await browser.newPage();
  const rawB64 = `data:image/jpeg;base64,${fs.readFileSync(RAW_STRAWBERRY).toString('base64')}`;

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

    // 1. Build Background Model from corner and border strips
    // Background is near white (approx 248-255)
    const bgSamples = [];
    for (let x = 0; x < w; x += 10) {
      // Top border
      bgSamples.push([data[x * 4], data[x * 4 + 1], data[x * 4 + 2]]);
      // Bottom border corners
      if (x < 150 || x > w - 150) {
        const idx = ((h - 1) * w + x) * 4;
        bgSamples.push([data[idx], data[idx + 1], data[idx + 2]]);
      }
    }
    for (let y = 0; y < h; y += 10) {
      // Left border
      bgSamples.push([data[(y * w) * 4], data[(y * w) * 4 + 1], data[(y * w) * 4 + 2]]);
      // Right border
      bgSamples.push([data[(y * w + (w - 1)) * 4], data[(y * w + (w - 1)) * 4 + 1], data[(y * w + (w - 1)) * 4 + 2]]);
    }

    const avgBgR = bgSamples.reduce((sum, s) => sum + s[0], 0) / bgSamples.length;
    const avgBgG = bgSamples.reduce((sum, s) => sum + s[1], 0) / bgSamples.length;
    const avgBgB = bgSamples.reduce((sum, s) => sum + s[2], 0) / bgSamples.length;

    // 2. Perform Precise Morphological Edge Detection & Flood Fill
    // We compute a distance map from pure background
    const distMap = new Float32Array(w * h);
    const isDefiniteBg = new Uint8Array(w * h);

    for (let i = 0; i < w * h; i++) {
      const r = data[i * 4];
      const g = data[i * 4 + 1];
      const b = data[i * 4 + 2];

      const dr = r - avgBgR;
      const dg = g - avgBgG;
      const db = b - avgBgB;
      const dist = Math.sqrt(dr * dr + dg * dg + db * db);
      distMap[i] = dist;

      // Definite background has very low distance from white backdrop
      // and high brightness
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      if (dist < 18 && lum > 235) {
        isDefiniteBg[i] = 1;
      }
    }

    // 3. Flood Fill from image borders to identify all connected exterior background
    // This prevents internal white milk from ever being marked as exterior background!
    const exteriorBg = new Uint8Array(w * h);
    const queue = new Int32Array(w * h);
    let qHead = 0;
    let qTail = 0;

    // Seed exterior queue from image outer perimeter
    for (let x = 0; x < w; x++) {
      exteriorBg[x] = 1;
      queue[qTail++] = x;
      const bottomIdx = (h - 1) * w + x;
      exteriorBg[bottomIdx] = 1;
      queue[qTail++] = bottomIdx;
    }
    for (let y = 0; y < h; y++) {
      const leftIdx = y * w;
      if (!exteriorBg[leftIdx]) {
        exteriorBg[leftIdx] = 1;
        queue[qTail++] = leftIdx;
      }
      const rightIdx = y * w + (w - 1);
      if (!exteriorBg[rightIdx]) {
        exteriorBg[rightIdx] = 1;
        queue[qTail++] = rightIdx;
      }
    }

    // BFS Flood Fill outward
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
        if (n !== -1 && !exteriorBg[n]) {
          // A pixel is exterior background if it's close to background color OR table reflection below cup
          const r = data[n * 4];
          const g = data[n * 4 + 1];
          const b = data[n * 4 + 2];
          const dist = distMap[n];
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;

          // Exterior condition: high luminance and low chroma
          const maxChannel = Math.max(r, g, b);
          const minChannel = Math.min(r, g, b);
          const saturation = maxChannel > 0 ? (maxChannel - minChannel) / maxChannel : 0;

          // For the glass straw and clear lid rim:
          // The straw has refraction lines with dist > 20
          // The outer backdrop has dist < 22 and saturation < 0.08
          if (dist < 22 && saturation < 0.08 && lum > 230) {
            exteriorBg[n] = 1;
            queue[qTail++] = n;
          }
        }
      }
    }

    // 4. Compute High-Fidelity Alpha & Color Decontamination
    const outImgData = ctx.createImageData(w, h);
    const out = outImgData.data;

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const idx = y * w + x;
        const pIdx = idx * 4;

        const r = data[pIdx];
        const g = data[pIdx + 1];
        const b = data[pIdx + 2];
        const dist = distMap[idx];

        if (exteriorBg[idx]) {
          // Outer background pixel
          if (dist <= 14) {
            // Pure exterior background: 100% transparent
            out[pIdx] = 0;
            out[pIdx + 1] = 0;
            out[pIdx + 2] = 0;
            out[pIdx + 3] = 0;
          } else {
            // Soft anti-aliased edge or specular highlight reflection
            const t = Math.min(1, Math.max(0, (dist - 14) / 28));
            const alpha = Math.round(t * t * (3 - 2 * t) * 255);

            if (alpha > 0) {
              const aNorm = alpha / 255;
              // Color decontamination: subtract white backdrop tint
              const cleanR = Math.max(0, Math.min(255, (r - avgBgR * (1 - aNorm)) / aNorm));
              const cleanG = Math.max(0, Math.min(255, (g - avgBgG * (1 - aNorm)) / aNorm));
              const cleanB = Math.max(0, Math.min(255, (b - avgBgB * (1 - aNorm)) / aNorm));
              out[pIdx] = Math.round(cleanR);
              out[pIdx + 1] = Math.round(cleanG);
              out[pIdx + 2] = Math.round(cleanB);
              out[pIdx + 3] = alpha;
            } else {
              out[pIdx] = 0;
              out[pIdx + 1] = 0;
              out[pIdx + 2] = 0;
              out[pIdx + 3] = 0;
            }
          }
        } else {
          // Interior cup pixel (100% opaque, retaining full rich color and milk texture)
          out[pIdx] = r;
          out[pIdx + 1] = g;
          out[pIdx + 2] = b;
          out[pIdx + 3] = 255;
        }
      }
    }

    ctx.putImageData(outImgData, 0, 0);

    // 5. Find tight bounding box of the true product (including straw & lid)
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

    // 6. Normalize onto standard 896 × 1200 canvas
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
    
    // Scale product to fit elegantly in the 896x1200 canvas
    const scale = Math.min((targetW * 0.72) / bboxW, (targetH * 0.82) / bboxH);
    const drawW = bboxW * scale;
    const drawH = bboxH * scale;
    const drawX = (targetW - drawW) / 2;
    // Align base to Y = 1040 for physical grounding
    const drawY = 1040 - drawH;

    targetCtx.drawImage(cvs, minX, minY, bboxW, bboxH, drawX, drawY, drawW, drawH);

    return targetCvs.toDataURL('image/png');
  }, rawB64);

  const base64Data = resultPngB64.replace(/^data:image\/png;base64,/, '');
  fs.mkdirSync('public/assets/products/hero-final', { recursive: true });
  fs.writeFileSync('public/assets/products/hero-final/hero_matcha_strawberry.png', Buffer.from(base64Data, 'base64'));

  console.log('✓ Saved master candidate: public/assets/products/hero-final/hero_matcha_strawberry.png');
  await browser.close();
}

processStrawberryMaster();
