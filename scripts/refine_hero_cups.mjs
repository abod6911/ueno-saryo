import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function refineHeroCups() {
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

      // Draw the clipped cup with precise dome lid
      ctx.save();
      ctx.beginPath();

      // Top Dome Lid: starts at left lip (34*scale, 96*scale), curves up to (200*scale, 66*scale), down to right lip (366*scale, 96*scale)
      ctx.moveTo(34 * scale, 96 * scale);
      ctx.bezierCurveTo(90 * scale, 64 * scale, 310 * scale, 64 * scale, 366 * scale, 96 * scale);

      // Right Lid Rim
      ctx.bezierCurveTo(376 * scale, 102 * scale, 374 * scale, 110 * scale, 364 * scale, 114 * scale);

      // Right Cup Inset & Wall (Tapering from top-right 354, 116 down to bottom-right 300, 498)
      ctx.lineTo(354 * scale, 116 * scale);
      ctx.lineTo(300 * scale, 498 * scale);

      // Bottom Rounded Cup Base (from 300, 498 to 100, 498 with convex arc down to 200, 508)
      ctx.bezierCurveTo(255 * scale, 508 * scale, 145 * scale, 508 * scale, 100 * scale, 498 * scale);

      // Left Cup Wall (Tapering up from bottom-left 100, 498 to top-left 46, 116)
      ctx.lineTo(46 * scale, 116 * scale);

      // Left Lid Rim
      ctx.lineTo(36 * scale, 114 * scale);
      ctx.bezierCurveTo(26 * scale, 110 * scale, 24 * scale, 102 * scale, 34 * scale, 96 * scale);

      ctx.closePath();
      ctx.clip();

      // Draw original image
      ctx.drawImage(img, 0, 0, targetW, targetH);
      ctx.restore();

      const imgData = ctx.getImageData(0, 0, targetW, targetH);
      const { data } = imgData;

      // Complete text & price tag erasure:
      // We know that across the middle (x from 240 to 560) between y=640 and y=1040,
      // the texture is a smooth horizontal continuation of the drink at x=190..230 and x=570..610.
      for (let y = 640; y <= 1040; y++) {
        // Sample left clean pixel and right clean pixel
        const leftX = 210;
        const rightX = 590;
        const li = (y * targetW + leftX) * 4;
        const ri = (y * targetW + rightX) * 4;

        if (data[li + 3] > 0 && data[ri + 3] > 0) {
          for (let x = 240; x <= 560; x++) {
            const idx = (y * targetW + x) * 4;
            if (data[idx + 3] > 0) {
              const weight = (x - leftX) / (rightX - leftX);
              // Add very subtle organic variation so it looks 100% natural and photo-realistic
              const noise = Math.sin(x * 0.1 + y * 0.2) * 3;
              data[idx] = Math.min(255, Math.max(0, Math.round(data[li] * (1 - weight) + data[ri] * weight + noise)));
              data[idx + 1] = Math.min(255, Math.max(0, Math.round(data[li + 1] * (1 - weight) + data[ri + 1] * weight + noise)));
              data[idx + 2] = Math.min(255, Math.max(0, Math.round(data[li + 2] * (1 - weight) + data[ri + 2] * weight + noise)));
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

              // Vibrant golden mango puree: rich warm amber-orange
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

refineHeroCups();
