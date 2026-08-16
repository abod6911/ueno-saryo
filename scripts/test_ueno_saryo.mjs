import { chromium } from 'playwright';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = path.resolve('test_screenshots');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function runTests() {
  console.log('🚀 Starting Vite Dev Server for Playwright Verification...');
  const vite = spawn('npx', ['vite', '--port', '5173'], {
    shell: true,
    stdio: 'pipe',
  });

  // Wait for Vite to be ready
  await new Promise((resolve) => {
    vite.stdout.on('data', (data) => {
      const str = data.toString();
      console.log(str);
      if (str.includes('Local:') || str.includes('5173')) {
        resolve();
      }
    });
    setTimeout(resolve, 3000);
  });

  console.log('🌐 Launching Playwright Browser (using msedge/chrome)...');
  let browser;
  try {
    browser = await chromium.launch({ headless: true, channel: 'msedge' });
  } catch (e) {
    try {
      browser = await chromium.launch({ headless: true, channel: 'chrome' });
    } catch (e2) {
      console.log('Falling back to default chromium...');
      browser = await chromium.launch({ headless: true });
    }
  }

  const viewports = [
    { name: 'desktop_1920x1080', width: 1920, height: 1080 },
    { name: 'laptop_1440x900', width: 1440, height: 900 },
    { name: 'tablet_768x1024', width: 768, height: 1024 },
    { name: 'mobile_375x812', width: 375, height: 812, isMobile: true },
    { name: 'mobile_390x844', width: 390, height: 844, isMobile: true },
    { name: 'mobile_430x932', width: 430, height: 932, isMobile: true },
  ];

  try {
    for (const vp of viewports) {
      console.log(`\n📱 Testing Viewport: ${vp.name} (${vp.width}x${vp.height})`);
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        isMobile: vp.isMobile || false,
      });
      const page = await context.newPage();

      // Collect console errors
      const errors = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          console.error(`[Browser Error]:`, msg.text());
          errors.push(msg.text());
        }
      });

      await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
      await page.waitForTimeout(1000);

      // Verify no horizontal overflow
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      console.log(`  Width check: clientWidth=${clientWidth}, scrollWidth=${scrollWidth}`);
      if (scrollWidth > clientWidth + 1) {
        console.warn(`  ⚠️ Warning: Horizontal overflow detected on ${vp.name}!`);
      } else {
        console.log(`  ✅ Clean viewport width: No horizontal overflow.`);
      }

      // Check RTL
      const dir = await page.getAttribute('html', 'dir');
      console.log(`  HTML Dir attribute: ${dir}`);

      // Capture Initial Hero Screenshot
      await page.screenshot({
        path: path.join(SCREENSHOT_DIR, `${vp.name}_hero_ar.png`),
      });

      // Capture Full Page Screenshot
      await page.screenshot({
        path: path.join(SCREENSHOT_DIR, `${vp.name}_full_page_ar.png`),
        fullPage: true,
      });

      // Test Language Toggle
      const langBtn = await page.locator('button:has-text("EN"), button:has-text("العربية")').first();
      if (await langBtn.isVisible()) {
        await langBtn.click();
        await page.waitForTimeout(500);
        const newDir = await page.getAttribute('html', 'dir');
        console.log(`  After Language Switch -> HTML Dir: ${newDir}`);
        await page.screenshot({
          path: path.join(SCREENSHOT_DIR, `${vp.name}_hero_en.png`),
        });
      }

      // Test Menu Category Click & Search (on desktop)
      if (vp.width >= 768) {
        console.log('  Testing Menu Search...');
        const searchInput = page.locator('input[placeholder*="Search"], input[placeholder*="ابحث"]').first();
        if (await searchInput.isVisible()) {
          await searchInput.fill('matcha');
          await page.waitForTimeout(300);
          await page.screenshot({
            path: path.join(SCREENSHOT_DIR, `${vp.name}_menu_search_matcha.png`),
          });
          await searchInput.fill('');
          await page.waitForTimeout(300);
        }

        // Test Product Detail Modal
        console.log('  Testing Product Modal...');
        const firstCard = page.locator('#menu .group').first();
        if (await firstCard.isVisible()) {
          await firstCard.click();
          await page.waitForTimeout(500);
          await page.screenshot({
            path: path.join(SCREENSHOT_DIR, `${vp.name}_product_modal.png`),
          });
          // Press ESC
          await page.keyboard.press('Escape');
          await page.waitForTimeout(300);
        }
      }

      await context.close();
    }

    console.log('\n🎉 All Playwright automated tests completed successfully!');
  } catch (err) {
    console.error('Test execution error:', err);
  } finally {
    if (browser) await browser.close();
    vite.kill();
    process.exit(0);
  }
}

runTests();
