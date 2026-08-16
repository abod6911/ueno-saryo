import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function testOptions() {
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

      // Draw clipped cup
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

      // Only heal pixels that are ACTUALLY text or price tag
      for (let y = 640; y <= 1040; y++) {
        for (let x = 220; x <= 580; x++) {
          const idx = (y * targetW + x) * 4;
          const a = data[idx + 3];
          if (a > 0) {
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];

            // In drink_original:
            // Matcha color: r ~ 80..130, g ~ 100..150, b ~ 40..80
            // Text color: r > 185, g > 185, b > 185 (white letters)
            // Price pill: r > 195, g > 195, b > 165
            const isWhiteText = (r > 180 && g > 180 && b > 170);
            const isPricePill = (y >= 880 && r > 180 && g > 175 && b > 140 && Math.abs(r - g) < 25);

            if (isWhiteText || isPricePill) {
              // Sample horizontally closest non-text pixel
              let found = false;
              for (let dX = 1; dX < 120; dX++) {
                // Try left
                const leftX = x - dX;
                if (leftX >= 100) {
                  const li = (y * targetW + leftX) * 4;
                  if (data[li + 3] > 0 && !(data[li] > 180 && data[li + 1] > 180 && data[li + 2] > 170)) {
                    data[idx] = data[li];
                    data[idx + 1] = data[li + 1];
                    data[idx + 2] = data[li + 2];
                    found = true;
                    break;
                  }
                }
                // Try right
                const rightX = x + dX;
                if (rightX <= 700) {
                  const ri = (y * targetW + rightX) * 4;
                  if (data[ri + 3] > 0 && !(data[ri] > 180 && data[ri + 1] > 180 && data[ri + 2] > 170)) {
                    data[idx] = data[ri];
                    data[idx + 1] = data[ri + 1];
                    data[idx + 2] = data[ri + 2];
                    found = true;
                    break;
                  }
                }
              }
            }
          }
        }
      }

      // If Mango flavor: transform the bottom layer (y > 580) to rich golden Alphonso Mango!
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

      // Edge defringe and anti-aliasing
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
    console.log(`Saved clean product: public/assets/products/${filename}`);
  }

  await browser.close();
}

testOptions();
