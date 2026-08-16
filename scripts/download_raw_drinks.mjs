import https from 'https';
import fs from 'fs';
import path from 'path';

// Let's test curated URLs for takeaway cup / iced matcha latte drinks
const candidates = [
  {
    name: 'raw_matcha_latte_1.jpg',
    url: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=1200&q=85',
  },
  {
    name: 'raw_matcha_latte_2.jpg',
    url: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=1200&q=85',
  },
  {
    name: 'raw_strawberry_matcha.jpg',
    url: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=1200&q=85',
  },
  {
    name: 'raw_blueberry_matcha.jpg',
    url: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=1200&q=85',
  },
  {
    name: 'raw_mango_matcha.jpg',
    url: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=1200&q=85',
  },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.resolve(dest));
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, (redirectRes) => {
          redirectRes.pipe(file);
          file.on('finish', () => { file.close(); resolve(); });
        }).on('error', reject);
        return;
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  for (const c of candidates) {
    try {
      await download(c.url, `public/assets/products/${c.name}`);
      console.log(`Downloaded ${c.name}`);
    } catch (e) {
      console.error(`Failed ${c.name}:`, e.message);
    }
  }
}

run();
