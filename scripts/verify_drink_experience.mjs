import { chromium } from 'playwright';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// 1. Start vite preview or dev server
const vite = spawn('npx', ['vite', '--port', '5199', '--strictPort'], {
  cwd: ROOT,
  shell: true,
  stdio: 'pipe',
});

let serverReady = false;

vite.stdout.on('data', (d) => {
  const str = d.toString();
  if (str.includes('Local:') || str.includes('5199')) {
    serverReady = true;
  }
});

for (let i = 0; i < 30; i++) {
  if (serverReady) break;
  await new Promise((r) => setTimeout(r, 300));
}

try {
  console.log('🚀 Launching Chromium for Drink Experience verification...');
  const browser = await chromium.launch({ headless: true });

  const artifactDir = 'C:\\Users\\abodv\\.gemini\\antigravity\\brain\\be5ca263-d9e3-4de4-b58b-20dd5275cfb9';

  // Desktop Test: 1440x900 (Arabic Default)
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();
  await page.goto('http://localhost:5199/', { waitUntil: 'networkidle' });

  // Scroll down to menu
  console.log('🍵 Scrolling to Menu section...');
  const menuSec = page.locator('#menu');
  await menuSec.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  // Click Ceremonial Matcha Latte (first item)
  console.log('✨ Clicking on Ceremonial Matcha Latte...');
  const matchaCard = page.locator('h3:has-text("ماتشا لاتيه احتفالي"), h3:has-text("Ceremonial Matcha Latte")').first();
  await matchaCard.click();
  await page.waitForTimeout(1000);

  // Capture Desktop Arabic Drink Experience Modal
  await page.screenshot({
    path: path.join(artifactDir, 'desktop_1440x900_drink_reveal_ar.png'),
    fullPage: false,
  });
  console.log('📸 Captured desktop_1440x900_drink_reveal_ar.png');

  // Test Escape key close
  console.log('⌨️ Testing Escape key close...');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);

  // Switch language to English
  console.log('🌐 Switching to English...');
  const langBtn = page.locator('button[aria-label="Select Language"], button:has-text("العربية")').first();
  await langBtn.click();
  await page.waitForTimeout(300);
  const enOption = page.locator('button[role="option"]:has-text("English")').first();
  await enOption.click();
  await page.waitForTimeout(500);

  // Scroll to menu and open Blueberry Matcha
  await menuSec.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const blueberryCard = page.locator('h3:has-text("Blueberry Matcha")').first();
  await blueberryCard.click();
  await page.waitForTimeout(1000);

  // Capture Desktop English Drink Experience Modal
  await page.screenshot({
    path: path.join(artifactDir, 'desktop_1440x900_drink_reveal_en.png'),
    fullPage: false,
  });
  console.log('📸 Captured desktop_1440x900_drink_reveal_en.png');

  // Close via button
  const closeBtn = page.locator('button:has-text("Back to Menu")').first();
  await closeBtn.click();
  await page.waitForTimeout(400);

  // Switch to Chinese (zh-CN)
  console.log('🌐 Switching to Chinese (zh-CN)...');
  await langBtn.click();
  await page.waitForTimeout(300);
  const zhOption = page.locator('button[role="option"]:has-text("简体中文")').first();
  await zhOption.click();
  await page.waitForTimeout(500);

  // Scroll to menu and open Strawberry Matcha
  await menuSec.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const strawberryCard = page.locator('h3:has-text("草莓抹茶云朵")').first();
  await strawberryCard.click();
  await page.waitForTimeout(1000);

  // Capture Desktop Chinese Drink Experience Modal
  await page.screenshot({
    path: path.join(artifactDir, 'desktop_1440x900_drink_reveal_zh.png'),
    fullPage: false,
  });
  console.log('📸 Captured desktop_1440x900_drink_reveal_zh.png');

  // Mobile Viewport Test: iPhone 14 (390x844)
  console.log('📱 Testing Mobile Viewport (390x844)...');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:5199/', { waitUntil: 'networkidle' });

  // Open menu and tap on Matcha Latte
  const mobileMenuSec = mobilePage.locator('#menu');
  await mobileMenuSec.scrollIntoViewIfNeeded();
  await mobilePage.waitForTimeout(500);

  const mobileMatchaCard = mobilePage.locator('h3:has-text("ماتشا لاتيه احتفالي")').first();
  await mobileMatchaCard.click();
  await mobilePage.waitForTimeout(1000);

  await mobilePage.screenshot({
    path: path.join(artifactDir, 'mobile_390x844_drink_reveal_ar.png'),
    fullPage: false,
  });
  console.log('📸 Captured mobile_390x844_drink_reveal_ar.png');

  await browser.close();
  console.log('🎉 Premium Drink Experience Verification Completed Successfully! 🎉');
} finally {
  vite.kill();
}
