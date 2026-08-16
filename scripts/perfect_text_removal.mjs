import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function perfectTextRemoval() {
  let browser;
  try {
    browser = await chromium.launch({ headless: true, channel: 'chrome' });
  } catch (e) {
    browser = await chromium.launch({ headless: true, channel: 'msedge' });
  }
  const page = await browser.newPage();
  await page.goto('http://localhost:5173');

  const result = await page.evaluate(async () => {
    const drinks = [
      { id: 'original', file: '/assets/products/drink_original.png', flavor: 'original' },
      { id: 'strawberry', file: '/assets/products/drink_strawberry.png', flavor: 'strawberry' },
      { id: 'blueberry', file: '/assets/products/drink_blueberry.png', flavor: 'blueberry' },
      { id: 'mango', file: '/assets/products/drink_original.png', flavor: 'mango' },
    ];

    const processed = {};

    for (const d of drinks) {
      const img = new Image();
      img.src = d.file;
      await new Promise((r) => { img.onload = r; });

      const targetW = 800;
      const targetH = 1080;
      const canvas = document.createElement('canvas');
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });

      const scale = 2.0;

      // Precision Cup Contour
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(34 * scale, 96 * scale);
      ctx.bezierCurveTo(90 * scale, 64 * scale, 310 * scale, 64 * scale, 366 * scale, 96 * scale);
      ctx.bezierCurveTo(376 * scale, 102 * scale, 374 * scale, 110 * scale, 364 * scale, 114 * scale);
      ctx.lineTo(354 * scale, 116 * scale);
      ctx.lineTo(300 * scale, 498 * scale);
      ctx.bezierCurveTo(255 * scale, 508 * scale, 145 * scale, 508 * scale, 100 * scale, 498 * scale);
      ctx.lineTo(46 * scale, 116 * scale);
      ctx.lineTo(36 * scale, 114 * scale);
      ctx.bezierCurveTo(26 * scale, 110 * scale, 24 * scale, 102 * scale, 34 * scale, 96 * scale);
      ctx.closePath();
      ctx.clip();

      ctx.drawImage(img, 0, 0, targetW, targetH);
      ctx.restore();

      const imgData = ctx.getImageData(0, 0, targetW, targetH);
      const { data } = imgData;

      if (d.flavor === 'original' || d.flavor === 'mango') {
        for (let y = 645; y <= 1030; y++) {
          let cupLeft = -1, cupRight = -1;
          for (let x = 0; x < targetW; x++) {
            if (data[(y * targetW + x) * 4 + 3] > 0) {
              if (cupLeft === -1) cupLeft = x;
              cupRight = x;
            }
          }

          if (cupLeft !== -1 && cupRight !== -1 && cupRight - cupLeft > 80) {
            const sampleLeftX = cupLeft + 12;
            const sampleRightX = cupRight - 12;

            const lIdx = (y * targetW + sampleLeftX) * 4;
            const rIdx = (y * targetW + sampleRightX) * 4;

            const lR = data[lIdx], lG = data[lIdx + 1], lB = data[lIdx + 2];
            const rR = data[rIdx], rG = data[rIdx + 1], rB = data[rIdx + 2];

            const textStartX = cupLeft + 25;
            const textEndX = cupRight - 25;

            for (let x = textStartX; x <= textEndX; x++) {
              const idx = (y * targetW + x) * 4;
              if (data[idx + 3] > 0) {
                const t = (x - sampleLeftX) / (sampleRightX - sampleLeftX);
                const expR = lR * (1 - t) + rR * t;
                const expG = lG * (1 - t) + rG * t;
                const expB = lB * (1 - t) + rB * t;
                const noise = Math.sin(x * 0.08 + y * 0.15) * 2.5;

                data[idx] = Math.min(255, Math.max(0, Math.round(expR + noise)));
                data[idx + 1] = Math.min(255, Math.max(0, Math.round(expG + noise)));
                data[idx + 2] = Math.min(255, Math.max(0, Math.round(expB + noise)));
              }
            }
          }
        }
      } else {
        // Strawberry & Blueberry:
        // Text inpaint spanning full width from cupLeft + 20 to cupRight - 20
        for (let y = 650; y <= 1030; y++) {
          let cupLeft = -1, cupRight = -1;
          for (let x = 0; x < targetW; x++) {
            if (data[(y * targetW + x) * 4 + 3] > 0) {
              if (cupLeft === -1) cupLeft = x;
              cupRight = x;
            }
          }

          if (cupLeft !== -1 && cupRight !== -1 && cupRight - cupLeft > 60) {
            // For upper mid section (y=650..750): vertical clone from fruit swirl y=550..620
            if (y <= 750) {
              const sourceY = Math.round(540 + (y - 650) * 0.7);
              for (let x = cupLeft + 15; x <= cupRight - 15; x++) {
                const idx = (y * targetW + x) * 4;
                const sIdx = (sourceY * targetW + x) * 4;
                if (data[idx + 3] > 0 && data[sIdx + 3] > 0) {
                  const noise = Math.sin(x * 0.1 + y * 0.2) * 2;
                  data[idx] = Math.min(255, Math.max(0, Math.round(data[sIdx] + noise)));
                  data[idx + 1] = Math.min(255, Math.max(0, Math.round(data[sIdx + 1] + noise)));
                  data[idx + 2] = Math.min(255, Math.max(0, Math.round(data[sIdx + 2] + noise)));
                }
              }
            } else {
              // Lower green matcha / milk base (y=751..1030): horizontal interpolation
              const lIdx = (y * targetW + (cupLeft + 12)) * 4;
              const rIdx = (y * targetW + (cupRight - 12)) * 4;
              const lR = data[lIdx], lG = data[lIdx + 1], lB = data[lIdx + 2];
              const rR = data[rIdx], rG = data[rIdx + 1], rB = data[rIdx + 2];

              for (let x = cupLeft + 18; x <= cupRight - 18; x++) {
                const idx = (y * targetW + x) * 4;
                if (data[idx + 3] > 0) {
                  const t = (x - cupLeft) / (cupRight - cupLeft);
                  const expR = lR * (1 - t) + rR * t;
                  const expG = lG * (1 - t) + rG * t;
                  const expB = lB * (1 - t) + rB * t;
                  const noise = Math.sin(x * 0.08 + y * 0.15) * 2.5;

                  data[idx] = Math.min(255, Math.max(0, Math.round(expR + noise)));
                  data[idx + 1] = Math.min(255, Math.max(0, Math.round(expG + noise)));
                  data[idx + 2] = Math.min(255, Math.max(0, Math.round(expB + noise)));
                }
              }
            }
          }
        }
      }

      // If Mango flavor: transform the bottom layer (y > 560) to rich golden Alphonso Mango!
      if (d.flavor === 'mango') {
        for (let y = 560; y < targetH; y++) {
          for (let x = 0; x < targetW; x++) {
            const idx = (y * targetW + x) * 4;
            const a = data[idx + 3];
            if (a > 0) {
              const r = data[idx];
              const g = data[idx + 1];
              const b = data[idx + 2];
              const brightness = (r * 0.299 + g * 0.587 + b * 0.114);

              const factor = Math.min(1, Math.max(0, (y - 560) / 100));
              const mangoR = Math.min(255, Math.round(brightness * 1.3 + 45));
              const mangoG = Math.min(255, Math.round(brightness * 0.95 + 20));
              const mangoB = Math.max(10, Math.round(brightness * 0.12));

              data[idx] = Math.round(r * (1 - factor) + mangoR * factor);
              data[idx + 1] = Math.round(g * (1 - factor) + mangoG * factor);
              data[idx + 2] = Math.round(b * (1 - factor) + mangoB * factor);
            }
          }
        }
      }

      // Anti-aliasing boundary smoothing
      for (let y = 0; y < targetH; y++) {
        for (let x = 0; x < targetW; x++) {
          const idx = (y * targetW + x) * 4;
          const a = data[idx + 3];
          if (a > 0) {
            let minNeighborA = 255;
            for (let dy = -1; dy <= 1; dy++) {
              for (let dx = -1; dx <= 1; dx++) {
                if (x + dx >= 0 && x + dx < targetW && y + dy >= 0 && y + dy < targetH) {
                  const nIdx = ((y + dy) * targetW + (x + dx)) * 4;
                  if (data[nIdx + 3] < minNeighborA) {
                    minNeighborA = data[nIdx + 3];
                  }
                }
              }
            }

            if (minNeighborA === 0) {
              data[idx + 3] = Math.min(255, Math.round(a * 0.82));
            }
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
      processed[d.id] = canvas.toDataURL('image/png');
    }

    return processed;
  });

  for (const [id, dataUrl] of Object.entries(result)) {
    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
    const filename = `cup_clean_${id}.png`;
    fs.writeFileSync(path.resolve(`public/assets/products/${filename}`), Buffer.from(base64Data, 'base64'));
    console.log(`Saved pristine transparent product: public/assets/products/${filename}`);
  }

  await browser.close();
}

perfectTextRemoval();
