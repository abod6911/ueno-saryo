import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const videoPath = path.resolve(__dirname, '../public/reference.mp4');
const outputDir = path.resolve(__dirname, '../reference_frames');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Start tiny HTTP server to stream video
const server = http.createServer((req, res) => {
  if (req.url === '/video.mp4') {
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(videoPath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(200, head);
      fs.createReadStream(videoPath).pipe(res);
    }
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
        <body style="margin:0; background:black;">
          <video id="v" src="/video.mp4" muted playsinline></video>
          <canvas id="c"></canvas>
        </body>
      </html>
    `);
  }
});

server.listen(4567, async () => {
  console.log('Server running on port 4567');

  try {
    const browser = await chromium.launch({
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      headless: true
    });
    const page = await browser.newPage();
    await page.goto('http://localhost:4567', { waitUntil: 'load' });

    const videoInfo = await page.evaluate(async () => {
      const v = document.getElementById('v');
      return new Promise((resolve, reject) => {
        v.onloadedmetadata = () => {
          resolve({
            duration: v.duration,
            videoWidth: v.videoWidth,
            videoHeight: v.videoHeight
          });
        };
        v.onerror = (e) => reject(v.error);
        v.load();
      });
    });

    console.log('Video Info:', videoInfo);

    const timestamps = [
      0.0, 0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0, 2.25, 2.5, 2.75, 3.0,
      3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 8.9
    ].filter(t => t <= videoInfo.duration);

    for (const t of timestamps) {
      const base64Data = await page.evaluate(async (time) => {
        const v = document.getElementById('v');
        const c = document.getElementById('c');
        const ctx = c.getContext('2d');

        await new Promise((resolve) => {
          v.currentTime = time;
          v.onseeked = resolve;
        });

        c.width = v.videoWidth;
        c.height = v.videoHeight;
        ctx.drawImage(v, 0, 0, c.width, c.height);
        return c.toDataURL('image/png').split(',')[1];
      }, t);

      const filename = `frame_${t.toFixed(2).replace('.', '_')}s.png`;
      const filepath = path.join(outputDir, filename);
      fs.writeFileSync(filepath, Buffer.from(base64Data, 'base64'));
      console.log(`Saved ${filename}`);
    }

    await browser.close();
    console.log('DONE_EXTRACTION');
  } catch (err) {
    console.error('Error during extraction:', err);
  } finally {
    server.close();
    process.exit(0);
  }
});
