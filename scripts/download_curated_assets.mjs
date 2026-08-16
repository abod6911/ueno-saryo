import fs from 'fs';
import path from 'path';
import https from 'https';

const ARTIFACT_DIR = 'C:/Users/abodv/.gemini/antigravity/brain/be5ca263-d9e3-4de4-b58b-20dd5275cfb9';

// Copy generated local images first
const localCopies = [
  {
    src: path.join(ARTIFACT_DIR, 'menu_matcha_latte_1786762081645.jpg'),
    dest: path.resolve('public/assets/products/menu_matcha_latte.jpg'),
  },
  {
    src: path.join(ARTIFACT_DIR, 'menu_strawberry_matcha_1786762195791.jpg'),
    dest: path.resolve('public/assets/products/menu_strawberry_matcha.jpg'),
  },
  {
    src: path.join(ARTIFACT_DIR, 'menu_blueberry_matcha_1786762311987.jpg'),
    dest: path.resolve('public/assets/products/menu_blueberry_matcha.jpg'),
  },
];

for (const item of localCopies) {
  if (fs.existsSync(item.src)) {
    fs.copyFileSync(item.src, item.dest);
    console.log(`Copied local generated image: ${item.dest}`);
  }
}

// Ensure directories exist
const dirs = [
  'public/assets/products',
  'public/assets/teas',
  'public/assets/desserts',
  'public/assets/fusion',
  'public/assets/gallery',
  'public/assets/experience',
];

for (const d of dirs) {
  const dirPath = path.resolve(d);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

const remoteAssets = [
  // Teas
  {
    url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/teas/tea_sencha.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/teas/tea_gyokuro.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/teas/tea_genmaicha.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/teas/tea_hojicha.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/teas/tea_white_needle.jpg',
  },

  // Matcha Drinks
  {
    url: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/products/menu_hot_chawan.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/products/menu_mango_matcha.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/products/menu_jasmine_matcha.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/products/menu_coconut_matcha.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/products/menu_cheese_cloud.jpg',
  },

  // Coffee & Fusion
  {
    url: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/fusion/fusion_kyoto_drip.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/fusion/fusion_matcha_espresso.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/fusion/fusion_rose_tea.jpg',
  },

  // Desserts
  {
    url: 'https://images.unsplash.com/photo-1583064313642-a7c14d498576?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/desserts/dessert_matcha_mochi.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/desserts/dessert_lemon_cake.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/desserts/dessert_walnut_cake.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/desserts/dessert_basque_cheesecake.jpg',
  },

  // Gallery
  {
    url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/assets/gallery/gallery_interior_zen.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/assets/gallery/gallery_tea_master.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1582793988951-9aed5509eb97?auto=format&fit=crop&w=1200&q=80',
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
    url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/assets/gallery/gallery_tea_pour.jpg',
  },

  // Experience Steps
  {
    url: 'https://images.unsplash.com/photo-1582793988951-9aed5509eb97?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/experience/step1_harvest.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/experience/step2_measure.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/experience/step3_heat.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/experience/step4_whisk.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/experience/step5_serve.jpg',
  },
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.resolve(dest));
    https.get(url, (response) => {
      // Handle redirects
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        https.get(response.headers.location, (res) => {
          res.pipe(file);
          file.on('finish', () => {
            file.close();
            console.log(`Downloaded: ${dest}`);
            resolve();
          });
        }).on('error', reject);
        return;
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${dest}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function downloadAll() {
  console.log('Downloading all curated high-definition culinary assets...');
  for (const asset of remoteAssets) {
    try {
      await downloadFile(asset.url, asset.dest);
    } catch (e) {
      console.error(`Failed to download ${asset.url}:`, e.message);
    }
  }
  console.log('Finished downloading all assets!');
}

downloadAll();
