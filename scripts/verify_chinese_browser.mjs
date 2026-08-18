import { chromium } from 'playwright';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// 1. Start vite preview or dev server
const vite = spawn('npx', ['vite', '--port', '5188', '--strictPort'], {
  cwd: ROOT,
  shell: true,
  stdio: 'pipe',
});

let serverReady = false;

vite.stdout.on('data', (d) => {
  const str = d.toString();
  // console.log('[Vite]', str);
  if (str.includes('Local:') || str.includes('5188')) {
    serverReady = true;
  }
});

vite.stderr.on('data', (d) => {
  // console.error('[Vite err]', d.toString());
});

// Wait for server ready
for (let i = 0; i < 30; i++) {
  if (serverReady) break;
  await new Promise((r) => setTimeout(r, 300));
}

try {
  console.log('🚀 Launching Chromium for QA visual walkthrough...');
  const browser = await chromium.launch({ headless: true });

  const artifactDir = 'C:\\Users\\abodv\\.gemini\\antigravity\\brain\\be5ca263-d9e3-4de4-b58b-20dd5275cfb9';

  // Desktop Test: 1440x900
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  await page.goto('http://localhost:5188/', { waitUntil: 'networkidle' });

  // 1. Initial State Screenshot (Arabic RTL default)
  await page.screenshot({
    path: path.join(artifactDir, 'desktop_1440x900_initial_ar.png'),
    fullPage: false,
  });
  console.log('📸 Captured desktop_1440x900_initial_ar.png');

  // 2. Click Language Selector and switch to Simplified Chinese
  console.log('🌐 Switching language to Simplified Chinese (简体中文)...');
  const langBtn = page.locator('button[aria-label="Select Language"], button:has-text("العربية"), button:has-text("English")').first();
  await langBtn.click();
  await page.waitForTimeout(300);

  // Click 简体中文 option
  const zhOption = page.locator('button[role="option"]:has-text("简体中文"), button:has-text("简体中文")').first();
  await zhOption.click();
  await page.waitForTimeout(600);

  // Assert html attributes
  const langAttr = await page.getAttribute('html', 'lang');
  const dirAttr = await page.getAttribute('html', 'dir');
  console.log(`🔎 HTML attributes: lang="${langAttr}", dir="${dirAttr}"`);
  if (langAttr !== 'zh-CN' || dirAttr !== 'ltr') {
    throw new Error(`Expected lang="zh-CN" and dir="ltr", got lang="${langAttr}" dir="${dirAttr}"`);
  }

  // 3. Capture Hero in Chinese
  await page.screenshot({
    path: path.join(artifactDir, 'desktop_1440x900_hero_zh.png'),
    fullPage: false,
  });
  console.log('📸 Captured desktop_1440x900_hero_zh.png');

  // 4. Scroll to Menu and search for "抹茶"
  console.log('🍵 Testing Chinese Menu search with "抹茶"...');
  const searchInput = page.locator('input[placeholder*="搜索"], input[placeholder*="Search"], input[placeholder*="بحث"]').first();
  await searchInput.scrollIntoViewIfNeeded();
  await searchInput.fill('抹茶');
  await page.waitForTimeout(500);

  await page.screenshot({
    path: path.join(artifactDir, 'desktop_1440x900_menu_search_matcha_zh.png'),
    fullPage: false,
  });
  console.log('📸 Captured desktop_1440x900_menu_search_matcha_zh.png');

  // 5. Test search with "草莓"
  console.log('🍓 Testing Chinese Menu search with "草莓"...');
  await searchInput.fill('草莓');
  await page.waitForTimeout(500);

  await page.screenshot({
    path: path.join(artifactDir, 'desktop_1440x900_menu_search_strawberry_zh.png'),
    fullPage: false,
  });
  console.log('📸 Captured desktop_1440x900_menu_search_strawberry_zh.png');

  // 6. Click on Strawberry item to open modal and verify Chinese modal content
  console.log('🔍 Opening Product Detail Modal in Chinese...');
  const card = page.locator('h3:has-text("草莓抹茶")').first();
  await card.click();
  await page.waitForTimeout(500);

  await page.screenshot({
    path: path.join(artifactDir, 'desktop_1440x900_modal_zh.png'),
    fullPage: false,
  });
  console.log('📸 Captured desktop_1440x900_modal_zh.png');

  // Close modal
  const closeBtn = page.locator('button[aria-label="Close modal"]').first();
  await closeBtn.click();
  await page.waitForTimeout(300);

  // Clear search
  await searchInput.fill('');
  await page.waitForTimeout(300);

  // 7. Scroll down to Tea Lab Process
  console.log('🧪 Capturing Tea Lab Process in Chinese...');
  const teaLab = page.locator('#tea-experience');
  await teaLab.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);

  await page.screenshot({
    path: path.join(artifactDir, 'desktop_1440x900_tea_lab_zh.png'),
    fullPage: false,
  });
  console.log('📸 Captured desktop_1440x900_tea_lab_zh.png');

  // 8. Scroll to Reviews
  console.log('⭐ Capturing Reviews in Chinese...');
  const reviews = page.locator('#reviews');
  await reviews.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);

  await page.screenshot({
    path: path.join(artifactDir, 'desktop_1440x900_reviews_zh.png'),
    fullPage: false,
  });
  console.log('📸 Captured desktop_1440x900_reviews_zh.png');

  // 9. Scroll to Visit & Opening Hours
  console.log('📍 Capturing Visit & Opening Hours in Chinese...');
  const visit = page.locator('#visit');
  await visit.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);

  await page.screenshot({
    path: path.join(artifactDir, 'desktop_1440x900_visit_zh.png'),
    fullPage: false,
  });
  console.log('📸 Captured desktop_1440x900_visit_zh.png');

  // 10. Mobile Viewport Test: iPhone 14 (390x844)
  console.log('📱 Testing Mobile Viewport (390x844)...');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:5188/', { waitUntil: 'networkidle' });

  // Switch to Chinese on mobile menu
  const mobileMenuBtn = mobilePage.locator('button[aria-label*="Menu"], button[aria-label*="القائمة"]').first();
  await mobileMenuBtn.click();
  await mobilePage.waitForTimeout(400);

  const mobileZhBtn = mobilePage.locator('button:has-text("简体中文")').first();
  await mobileZhBtn.click();
  await mobilePage.waitForTimeout(600);

  await mobilePage.screenshot({
    path: path.join(artifactDir, 'mobile_390x844_hero_zh.png'),
    fullPage: false,
  });
  console.log('📸 Captured mobile_390x844_hero_zh.png');

  await browser.close();
  console.log('🎉 Browser Walkthrough Test Completed Successfully! 🎉');
} finally {
  vite.kill();
}
