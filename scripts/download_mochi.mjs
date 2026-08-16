import fs from 'fs';
import path from 'path';
import https from 'https';

const items = [
  {
    url: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/desserts/dessert_matcha_mochi.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/assets/gallery/gallery_dessert_spread.jpg',
  },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.resolve(dest));
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, (redirectRes) => {
          redirectRes.pipe(file);
          file.on('finish', () => {
            file.close();
            const stats = fs.statSync(path.resolve(dest));
            console.log(`Saved ${dest} (${stats.size} bytes)`);
            resolve();
          });
        }).on('error', reject);
        return;
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        const stats = fs.statSync(path.resolve(dest));
        console.log(`Saved ${dest} (${stats.size} bytes)`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  for (const item of items) {
    await download(item.url, item.dest);
  }
}

run();
