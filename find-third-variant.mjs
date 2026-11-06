import { chromium } from 'playwright';

// Screenshot every 20px from 1300 down to 900
const widths = [];
for (let w = 1300; w >= 900; w -= 20) {
  widths.push({ width: w, height: 700 });
}

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('Finding third variant...\n');

  for (const viewport of widths) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    const screenshotPath = `./variant-test/w${viewport.width}.png`;
    await page.screenshot({ path: screenshotPath, fullPage: false });

    console.log(`✓ ${viewport.width}×${viewport.height} → ${screenshotPath}`);
  }

  console.log('\nScreenshots saved to ./variant-test/');
  await browser.close();
})();
