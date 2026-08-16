import fs from 'fs';
import path from 'path';
import https from 'https';

const galleryDownloads = [
  {
    url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/assets/gallery/gallery_interior_zen.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/assets/gallery/gallery_tea_master.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/assets/gallery/gallery_uji_harvest.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/assets/gallery/gallery_chawan_collection.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1583064313642-a7c14d498576?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/assets/gallery/gallery_dessert_spread.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/assets/gallery/gallery_tea_pour.jpg',
  },
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.resolve(dest));
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        https.get(response.headers.location, (res) => {
          res.pipe(file);
          file.on('finish', () => {
            file.close();
            console.log(`Saved: ${dest}`);
            resolve();
          });
        }).on('error', reject);
        return;
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Saved: ${dest}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  for (const g of galleryDownloads) {
    try {
      await downloadFile(g.url, g.dest);
    } catch (e) {
      console.error(`Failed: ${g.url}`, e.message);
    }
  }
}

run();
