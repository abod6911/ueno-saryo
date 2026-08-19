import { chromium } from 'playwright';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ARTIFACT_DIR = 'C:\\Users\\abodv\\.gemini\\antigravity\\brain\\be5ca263-d9e3-4de4-b58b-20dd5275cfb9';

const vite = spawn('npx', ['vite', '--port', '5188', '--strictPort'], {
  cwd: ROOT,
  shell: true,
  stdio: 'pipe',
});

let serverReady = false;
vite.stdout.on('data', (d) => {
  if (d.toString().includes('5188')) serverReady = true;
});

for (let i = 0; i < 30; i++) {
  if (serverReady) break;
  await new Promise((r) => setTimeout(r, 250));
}

try {
  const browser = await chromium.launch({ headless: true });

  // 1. Desktop 1440x900 Full Page
  const desktopCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const dPage = await desktopCtx.newPage();
  await dPage.goto('http://localhost:5188/', { waitUntil: 'networkidle' });
  await dPage.waitForTimeout(1000);

  await dPage.screenshot({
    path: path.join(ARTIFACT_DIR, 'baseline_desktop_1440_full.png'),
    fullPage: true,
  });

  // 2. Mobile 390x844 Full Page
  const mobileCtx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true });
  const mPage = await mobileCtx.newPage();
  await mPage.goto('http://localhost:5188/', { waitUntil: 'networkidle' });
  await mPage.waitForTimeout(1000);

  await mPage.screenshot({
    path: path.join(ARTIFACT_DIR, 'baseline_mobile_390_full.png'),
    fullPage: true,
  });

  console.log('📸 Baseline screenshots captured successfully!');
  await browser.close();
} finally {
  vite.kill();
}
