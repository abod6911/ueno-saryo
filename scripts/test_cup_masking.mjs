import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function testCupMasking() {
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
      { id: 'original', file: '/assets/products/drink_original.png' },
      { id: 'strawberry', file: '/assets/products/drink_strawberry.png' },
      { id: 'blueberry', file: '/assets/products/drink_blueberry.png' },
      { id: 'cranberry', file: '/assets/products/drink_cranberry.png' },
    ];

    const processed = {};

    for (const d of drinks) {
      const img = new Image();
      img.src = d.file;
      await new Promise((r) => { img.onload = r; });

      const w = img.naturalWidth;
      const h = img.naturalHeight;

      // Create high-res canvas (e.g. 1000 x 1350 for sharp rendering)
      const targetW = 800;
      const targetH = 1080;
      const canvas = document.createElement('canvas');
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });

      // Path for takeaway cup with lid
      // The original image has width=400, height=540.
      // Scaling factor: targetW / w = 2.0
      const scale = targetW / w;

      // Let's create an exact clipping path matching the clear cup & lid:
      ctx.save();
      ctx.beginPath();

      // Top of lid (slightly curved ellipse arc at the top)
      // Top lid edge: around y = 42 * scale
      // Left lid corner: (20 * scale, 75 * scale)
      // Top center lid: (200 * scale, 40 * scale)
      // Right lid corner: (380 * scale, 75 * scale)
      // Lid rim lower edge: (375 * scale, 95 * scale)
      // Cup body top right: (365 * scale, 95 * scale)
      // Cup body bottom right: (308 * scale, 505 * scale)
      // Cup bottom curved base center: (200 * scale, 515 * scale)
      // Cup body bottom left: (92 * scale, 505 * scale)
      // Cup body top left: (35 * scale, 95 * scale)
      // Lid rim lower left: (25 * scale, 95 * scale)

      // Start at top left lid
      ctx.moveTo(28 * scale, 76 * scale);
      // Top lid curve
      ctx.bezierCurveTo(90 * scale, 38 * scale, 310 * scale, 38 * scale, 372 * scale, 76 * scale);
      // Right lid lip
      ctx.bezierCurveTo(382 * scale, 82 * scale, 382 * scale, 90 * scale, 376 * scale, 96 * scale);
      // Inset under lid lip to cup wall
      ctx.lineTo(364 * scale, 98 * scale);
      // Right cup wall (tapered down to base)
      ctx.lineTo(306 * scale, 505 * scale);
      // Bottom curved base
      ctx.bezierCurveTo(260 * scale, 516 * scale, 140 * scale, 516 * scale, 94 * scale, 505 * scale);
      // Left cup wall (tapered up from base to under lid lip)
      ctx.lineTo(36 * scale, 98 * scale);
      // Left lid lip
      ctx.lineTo(24 * scale, 96 * scale);
      ctx.bezierCurveTo(18 * scale, 90 * scale, 18 * scale, 82 * scale, 28 * scale, 76 * scale);

      ctx.closePath();

      // Enable anti-aliased clip
      ctx.clip();

      // Draw the drink
      ctx.drawImage(img, 0, 0, targetW, targetH);

      ctx.restore();

      // Inpaint/Clean baked English text and price pill
      // In drink_original, the text 'Original' is around y=360..420 (scaled: 720..840)
      // And the price pill is around y=460..520 (scaled: 920..1040)
      // Let's sample the clean matcha/fruit/milk texture right above & below to smoothly blend over the text!
      const imgData = ctx.getImageData(0, 0, targetW, targetH);
      const { data } = imgData;

      // Inpainting logic for the center text & price tag:
      // For each drink, let's interpolate or heal the small rectangular region where the text was:
      // Original: y from 710 to 860, x from 240 to 560
      // Price pill: y from 900 to 1040, x from 280 to 520
      const healRegions = [
        { y1: 680, y2: 850, x1: 220, x2: 580 }, // Center text
        { y1: 890, y2: 1040, x1: 270, x2: 530 }, // Price pill
      ];

      for (const reg of healRegions) {
        for (let y = reg.y1; y <= reg.y2; y++) {
          for (let x = reg.x1; x <= reg.x2; x++) {
            const idx = (y * targetW + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            const a = data[idx + 3];

            if (a > 0) {
              // Check if pixel is part of white text or cream price tag
              // White text: r>190, g>190, b>190 and high brightness compared to surrounding matcha/milk
              const isWhiteText = (r > 195 && g > 195 && b > 195);
              const isPricePill = (y >= 890 && r > 200 && g > 195 && b > 175 && Math.abs(r - g) < 20);

              if (isWhiteText || isPricePill) {
                // Blend from adjacent horizontal background drink pixels
                let leftIdx = idx, rightIdx = idx;
                let foundLeft = false, foundRight = false;
                for (let offset = 1; offset < 90; offset++) {
                  if (!foundLeft && x - offset >= 100) {
                    const li = (y * targetW + (x - offset)) * 4;
                    if (data[li + 3] > 0 && !(data[li] > 195 && data[li + 1] > 195 && data[li + 2] > 195)) {
                      leftIdx = li;
                      foundLeft = true;
                    }
                  }
                  if (!foundRight && x + offset <= targetW - 100) {
                    const ri = (y * targetW + (x + offset)) * 4;
                    if (data[ri + 3] > 0 && !(data[ri] > 195 && data[ri + 1] > 195 && data[ri + 2] > 195)) {
                      rightIdx = ri;
                      foundRight = true;
                    }
                  }
                }

                if (foundLeft && foundRight) {
                  const tNorm = (x - (x - 20)) / 40;
                  data[idx] = Math.round(data[leftIdx] * 0.5 + data[rightIdx] * 0.5);
                  data[idx + 1] = Math.round(data[leftIdx + 1] * 0.5 + data[rightIdx + 1] * 0.5);
                  data[idx + 2] = Math.round(data[leftIdx + 2] * 0.5 + data[rightIdx + 2] * 0.5);
                } else if (foundLeft) {
                  data[idx] = data[leftIdx];
                  data[idx + 1] = data[leftIdx + 1];
                  data[idx + 2] = data[leftIdx + 2];
                }
              }
            }
          }
        }
      }

      // Edge defringe / decontamination:
      // For semi-transparent edge pixels, remove any green backdrop / white halo contamination
      for (let y = 0; y < targetH; y++) {
        for (let x = 0; x < targetW; x++) {
          const idx = (y * targetW + x) * 4;
          const a = data[idx + 3];
          if (a > 0 && a < 255) {
            // Defringe: if it's pale green/white edge, blend with clean product color
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            // If near lid (y < 200)
            if (y < 200 && g > r + 30) {
              data[idx + 3] = Math.round(a * 0.7); // smooth out halo
            }
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
      processed[d.id] = canvas.toDataURL('image/png');
    }

    return processed;
  });

  // Save the new masked images to public/assets/products/
  for (const [id, dataUrl] of Object.entries(result)) {
    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
    const filename = `cup_clean_${id === 'original' ? 'original' : id === 'cranberry' ? 'mango' : id}.png`;
    fs.writeFileSync(path.resolve(`public/assets/products/${filename}`), Buffer.from(base64Data, 'base64'));
    console.log(`Saved public/assets/products/${filename}`);
  }

  await browser.close();
}

testCupMasking();
