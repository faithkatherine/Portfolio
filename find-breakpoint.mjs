import { chromium } from 'playwright';

// Screenshot every 40px from 1300 down to 960 to find where control panel breaks
const widths = [];
for (let w = 1300; w >= 960; w -= 40) {
  widths.push({ width: w, height: 700 });
}

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('Finding control panel breakpoint...\n');

  for (const viewport of widths) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    const screenshotPath = `./breakpoint-test/w${viewport.width}h${viewport.height}.png`;
    await page.screenshot({ path: screenshotPath, fullPage: false });

    console.log(`✓ ${viewport.width}×${viewport.height} → ${screenshotPath}`);
  }

  console.log('\nScreenshots saved to ./breakpoint-test/');
  await browser.close();
})();
