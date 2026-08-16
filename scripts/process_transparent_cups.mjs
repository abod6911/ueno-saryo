import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/abodv/.gemini/antigravity/brain/be5ca263-d9e3-4de4-b58b-20dd5275cfb9';

const imageMap = [
  {
    src: path.join(ARTIFACT_DIR, 'drink_matcha_latte_1786758705643.jpg'),
    dest: path.resolve('public/assets/products/cup_clean_original.png'),
  },
  {
    src: path.join(ARTIFACT_DIR, 'drink_strawberry_latte_1786758774537.jpg'),
    dest: path.resolve('public/assets/products/cup_clean_strawberry.png'),
  },
  {
    src: path.join(ARTIFACT_DIR, 'drink_blueberry_latte_1786758845818.jpg'),
    dest: path.resolve('public/assets/products/cup_clean_blueberry.png'),
  },
  {
    src: path.join(ARTIFACT_DIR, 'drink_mango_matcha_1786758919726.jpg'),
    dest: path.resolve('public/assets/products/cup_clean_mango.png'),
  },
];

async function perfectCutout() {
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const page = await browser.newPage();

  for (const item of imageMap) {
    const base64 = fs.readFileSync(item.src).toString('base64');
    const dataUrl = `data:image/jpeg;base64,${base64}`;

    const pngBase64 = await page.evaluate(async (url) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);

          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imgData.data;

          // Process pixel by pixel:
          // The background of the generated product shot is white / near white (#FFFFFF -> #E5E5E5)
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            // Calculate lightness and color saturation
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            const saturation = max === 0 ? 0 : (max - min) / max;
            const lightness = (r + g + b) / 3;

            // White studio background has low saturation (< 0.15) and high lightness (> 195)
            if (saturation < 0.12 && lightness > 200) {
              if (lightness > 235) {
                data[i + 3] = 0; // Pure transparent
              } else {
                // Smooth progressive feather
                const factor = (lightness - 200) / 35;
                data[i + 3] = Math.max(0, Math.min(255, Math.floor((1 - factor) * 255)));
              }
            }
          }

          ctx.putImageData(imgData, 0, 0);
          resolve(canvas.toDataURL('image/png').split(',')[1]);
        };
        img.src = url;
      });
    }, dataUrl);

    fs.writeFileSync(item.dest, Buffer.from(pngBase64, 'base64'));
    console.log(`Exported clean transparent PNG: ${item.dest}`);
  }

  await browser.close();
}

perfectCutout();
