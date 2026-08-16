import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function createUnifiedDrinks() {
  let browser;
  try {
    browser = await chromium.launch({ headless: true, channel: 'chrome' });
  } catch (e) {
    browser = await chromium.launch({ headless: true, channel: 'msedge' });
  }
  const page = await browser.newPage();
  await page.goto('http://localhost:5173');

  const result = await page.evaluate(async () => {
    const img = new Image();
    img.src = '/assets/products/drink_original.png';
    await new Promise((r) => { img.onload = r; });

    const targetW = 800;
    const targetH = 1080;
    const scale = 2.0;

    // 1. Build Base Clean Cup
    const baseCanvas = document.createElement('canvas');
    baseCanvas.width = targetW;
    baseCanvas.height = targetH;
    const baseCtx = baseCanvas.getContext('2d', { willReadFrequently: true });

    baseCtx.save();
    baseCtx.beginPath();
    // Top Dome Lid (trimmed tightly to clear plastic lid)
    baseCtx.moveTo(34 * scale, 98 * scale);
    baseCtx.bezierCurveTo(90 * scale, 70 * scale, 310 * scale, 70 * scale, 366 * scale, 98 * scale);
    baseCtx.bezierCurveTo(376 * scale, 104 * scale, 374 * scale, 110 * scale, 364 * scale, 114 * scale);
    baseCtx.lineTo(354 * scale, 116 * scale);
    baseCtx.lineTo(300 * scale, 498 * scale);
    baseCtx.bezierCurveTo(255 * scale, 508 * scale, 145 * scale, 508 * scale, 100 * scale, 498 * scale);
    baseCtx.lineTo(46 * scale, 116 * scale);
    baseCtx.lineTo(36 * scale, 114 * scale);
    baseCtx.bezierCurveTo(26 * scale, 110 * scale, 24 * scale, 104 * scale, 34 * scale, 98 * scale);
    baseCtx.closePath();
    baseCtx.clip();

    baseCtx.drawImage(img, 0, 0, targetW, targetH);
    baseCtx.restore();

    const baseImgData = baseCtx.getImageData(0, 0, targetW, targetH);
    const baseData = baseImgData.data;

    // Heal text & price pill across lower half y=645..1030
    for (let y = 645; y <= 1030; y++) {
      let cupLeft = -1, cupRight = -1;
      for (let x = 0; x < targetW; x++) {
        if (baseData[(y * targetW + x) * 4 + 3] > 0) {
          if (cupLeft === -1) cupLeft = x;
          cupRight = x;
        }
      }

      if (cupLeft !== -1 && cupRight !== -1 && cupRight - cupLeft > 80) {
        const sampleLeftX = cupLeft + 12;
        const sampleRightX = cupRight - 12;

        const lIdx = (y * targetW + sampleLeftX) * 4;
        const rIdx = (y * targetW + sampleRightX) * 4;

        const lR = baseData[lIdx], lG = baseData[lIdx + 1], lB = baseData[lIdx + 2];
        const rR = baseData[rIdx], rG = baseData[rIdx + 1], rB = baseData[rIdx + 2];

        const textStartX = cupLeft + 20;
        const textEndX = cupRight - 20;

        for (let x = textStartX; x <= textEndX; x++) {
          const idx = (y * targetW + x) * 4;
          if (baseData[idx + 3] > 0) {
            const t = (x - sampleLeftX) / (sampleRightX - sampleLeftX);
            const expR = lR * (1 - t) + rR * t;
            const expG = lG * (1 - t) + rG * t;
            const expB = lB * (1 - t) + rB * t;
            const noise = Math.sin(x * 0.08 + y * 0.15) * 2.5;

            baseData[idx] = Math.min(255, Math.max(0, Math.round(expR + noise)));
            baseData[idx + 1] = Math.min(255, Math.max(0, Math.round(expG + noise)));
            baseData[idx + 2] = Math.min(255, Math.max(0, Math.round(expB + noise)));
          }
        }
      }
    }

    // Edge anti-aliasing
    for (let y = 0; y < targetH; y++) {
      for (let x = 0; x < targetW; x++) {
        const idx = (y * targetW + x) * 4;
        const a = baseData[idx + 3];
        if (a > 0) {
          let minNeighborA = 255;
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              if (x + dx >= 0 && x + dx < targetW && y + dy >= 0 && y + dy < targetH) {
                const nIdx = ((y + dy) * targetW + (x + dx)) * 4;
                if (baseData[nIdx + 3] < minNeighborA) minNeighborA = baseData[nIdx + 3];
              }
            }
          }
          if (minNeighborA === 0) {
            baseData[idx + 3] = Math.min(255, Math.round(a * 0.82));
          }
        }
      }
    }

    baseCtx.putImageData(baseImgData, 0, 0);

    const flavors = ['original', 'strawberry', 'blueberry', 'mango'];
    const outputs = {};

    for (const f of flavors) {
      const fCanvas = document.createElement('canvas');
      fCanvas.width = targetW;
      fCanvas.height = targetH;
      const fCtx = fCanvas.getContext('2d');
      fCtx.drawImage(baseCanvas, 0, 0);

      const fImgData = fCtx.getImageData(0, 0, targetW, targetH);
      const fData = fImgData.data;

      if (f === 'strawberry') {
        // Natural layered strawberry puree (y = 420..760)
        for (let y = 410; y < 770; y++) {
          for (let x = 0; x < targetW; x++) {
            const idx = (y * targetW + x) * 4;
            if (fData[idx + 3] > 0) {
              const r = fData[idx], g = fData[idx + 1], b = fData[idx + 2];
              const lum = (r * 0.299 + g * 0.587 + b * 0.114);

              const wave = Math.sin(x * 0.02 + y * 0.025) * 25 + Math.cos(x * 0.04) * 15;
              const effectiveY = y + wave;

              if (effectiveY > 430 && effectiveY < 750) {
                const intensity = Math.sin(((effectiveY - 430) / 320) * Math.PI);
                const strawbR = Math.min(255, Math.round(lum * 1.35 + 85));
                const strawbG = Math.max(10, Math.round(lum * 0.25 + 15));
                const strawbB = Math.max(15, Math.round(lum * 0.35 + 25));

                fData[idx] = Math.round(r * (1 - intensity * 0.88) + strawbR * (intensity * 0.88));
                fData[idx + 1] = Math.round(g * (1 - intensity * 0.88) + strawbG * (intensity * 0.88));
                fData[idx + 2] = Math.round(b * (1 - intensity * 0.88) + strawbB * (intensity * 0.88));
              }
            }
          }
        }
      } else if (f === 'blueberry') {
        // Deep purple wild blueberry compote (y = 410..770)
        for (let y = 410; y < 770; y++) {
          for (let x = 0; x < targetW; x++) {
            const idx = (y * targetW + x) * 4;
            if (fData[idx + 3] > 0) {
              const r = fData[idx], g = fData[idx + 1], b = fData[idx + 2];
              const lum = (r * 0.299 + g * 0.587 + b * 0.114);

              const wave = Math.sin(x * 0.022 + y * 0.028) * 25 + Math.cos(x * 0.045) * 15;
              const effectiveY = y + wave;

              if (effectiveY > 430 && effectiveY < 750) {
                const intensity = Math.sin(((effectiveY - 430) / 320) * Math.PI);
                const blueR = Math.min(255, Math.round(lum * 0.7 + 55));
                const blueG = Math.max(10, Math.round(lum * 0.25 + 20));
                const blueB = Math.min(255, Math.round(lum * 1.1 + 85));

                fData[idx] = Math.round(r * (1 - intensity * 0.9) + blueR * (intensity * 0.9));
                fData[idx + 1] = Math.round(g * (1 - intensity * 0.9) + blueG * (intensity * 0.9));
                fData[idx + 2] = Math.round(b * (1 - intensity * 0.9) + blueB * (intensity * 0.9));
              }
            }
          }
        }
      } else if (f === 'mango') {
        // Golden Alphonso Mango in bottom layer (y > 560)
        for (let y = 560; y < targetH; y++) {
          for (let x = 0; x < targetW; x++) {
            const idx = (y * targetW + x) * 4;
            if (fData[idx + 3] > 0) {
              const r = fData[idx], g = fData[idx + 1], b = fData[idx + 2];
              const lum = (r * 0.299 + g * 0.587 + b * 0.114);

              const factor = Math.min(1, Math.max(0, (y - 560) / 100));
              const mangoR = Math.min(255, Math.round(lum * 1.35 + 55));
              const mangoG = Math.min(255, Math.round(lum * 0.98 + 25));
              const mangoB = Math.max(10, Math.round(lum * 0.1));

              fData[idx] = Math.round(r * (1 - factor) + mangoR * factor);
              fData[idx + 1] = Math.round(g * (1 - factor) + mangoG * factor);
              fData[idx + 2] = Math.round(b * (1 - factor) + mangoB * factor);
            }
          }
        }
      }

      fCtx.putImageData(fImgData, 0, 0);
      outputs[f] = fCanvas.toDataURL('image/png');
    }

    return outputs;
  });

  for (const [id, dataUrl] of Object.entries(result)) {
    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
    const filename = `cup_clean_${id}.png`;
    fs.writeFileSync(path.resolve(`public/assets/products/${filename}`), Buffer.from(base64Data, 'base64'));
    console.log(`Saved clean transparent product: public/assets/products/${filename}`);
  }

  await browser.close();
}

createUnifiedDrinks();
