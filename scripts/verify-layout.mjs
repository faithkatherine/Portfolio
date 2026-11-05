import { chromium } from '@playwright/test';
import { mkdir } from 'fs/promises';
import { join } from 'path';

const NEXT_URL = 'http://localhost:3000';
const PROTO_URL = 'http://localhost:5173';
const OUTPUT_DIR = 'screenshots/layout-verification';

const channels = [
  { number: 1, name: 'Hello', selector: 'button[aria-label*="channel 01"]' },
  { number: 2, name: 'How I think', selector: 'button[aria-label*="channel 02"]' },
  { number: 3, name: 'Building blocks', selector: 'button[aria-label*="channel 03"]' },
  { number: 4, name: 'Experience', selector: 'button[aria-label*="channel 04"]' },
  { number: 5, name: 'Projects', selector: 'button[aria-label*="channel 05"]' },
  { number: 6, name: 'Off the clock', selector: 'button[aria-label*="channel 06"]' },
  { number: 7, name: 'Contact', selector: 'button[aria-label*="channel 07"]' },
];

const viewports = [
  { width: 1440, height: 900, name: '1440x900' },
  { width: 1280, height: 800, name: '1280x800' },
  { width: 1920, height: 1080, name: '1920x1080' },
];

async function verifyChannel(page, channel, viewport) {
  await page.goto(NEXT_URL);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

  // Navigate to channel
  await page.click(channel.selector);
  await page.waitForTimeout(1500);

  // a) Check canvas no clipping
  const canvasClipping = await page.evaluate(() => {
    const canvas = document.querySelector('.screen-canvas');
    if (!canvas) return { error: 'Canvas not found' };

    return {
      scrollHeight: canvas.scrollHeight,
      clientHeight: canvas.clientHeight,
      scrollWidth: canvas.scrollWidth,
      clientWidth: canvas.clientWidth,
      clipped: canvas.scrollHeight > canvas.clientHeight || canvas.scrollWidth > canvas.clientWidth,
    };
  });

  // b) Check canvas scaled width ≥ 92% of screen width
  const canvasWidth = await page.evaluate(() => {
    const screen = document.querySelector('.tv-screen');
    const canvas = document.querySelector('.screen-canvas');
    if (!screen || !canvas) return { error: 'Elements not found' };

    const screenInnerW = screen.clientWidth;
    const canvasStyle = window.getComputedStyle(canvas);
    const canvasW = parseFloat(canvasStyle.width);
    const scale = parseFloat(canvasStyle.transform.match(/matrix\(([^,]+)/)?.[1] || '1');
    const scaledW = canvasW * scale;

    return {
      screenInnerW,
      canvasW,
      scale,
      scaledW,
      percentage: (scaledW / screenInnerW) * 100,
      meetsTarget: (scaledW / screenInnerW) >= 0.92,
    };
  });

  // c) Check header one row
  const headerRow = await page.evaluate(() => {
    const wordmark = document.querySelector('.site-header > div:first-child');
    const nav = document.querySelector('.desktop-guide');
    const status = document.querySelector('.header-status');

    if (!wordmark || !nav || !status) return { error: 'Header elements not found' };

    const wordmarkTop = wordmark.getBoundingClientRect().top;
    const navTop = nav.getBoundingClientRect().top;
    const statusTop = status.getBoundingClientRect().top;

    return {
      wordmarkTop,
      navTop,
      statusTop,
      sameRow: Math.abs(wordmarkTop - navTop) < 10 && Math.abs(navTop - statusTop) < 10,
      maxDiff: Math.max(
        Math.abs(wordmarkTop - navTop),
        Math.abs(navTop - statusTop),
        Math.abs(wordmarkTop - statusTop)
      ),
    };
  });

  // d) Check page margins ≥ 16px
  const pageMargins = await page.evaluate(() => {
    const shell = document.querySelector('.app-shell');
    if (!shell) return { error: 'app-shell not found' };

    const shellRect = shell.getBoundingClientRect();
    const viewportWidth = window.innerWidth;

    return {
      leftMargin: shellRect.left,
      rightMargin: viewportWidth - shellRect.right,
      meetsTarget: shellRect.left >= 16 && (viewportWidth - shellRect.right) >= 16,
    };
  });

  return {
    channel: channel.name,
    viewport: viewport.name,
    clipping: canvasClipping,
    width: canvasWidth,
    header: headerRow,
    margins: pageMargins,
  };
}

async function captureComparison(page, url, channel, name) {
  await page.goto(url);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

  await page.click(channel.selector);
  await page.waitForTimeout(1500);

  const filename = `channel-${String(channel.number).padStart(2, '0')}-${name}.png`;
  await page.screenshot({ path: join(OUTPUT_DIR, filename), fullPage: false });

  return filename;
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });

  console.log('=== LAYOUT VERIFICATION ===\n');

  // Verify all channels at all viewports
  const results = [];
  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();

    console.log(`\n## Viewport: ${viewport.name}`);

    for (const channel of channels) {
      const result = await verifyChannel(page, channel, viewport);
      results.push(result);

      const checks = [
        result.clipping?.clipped === false ? '✓' : '✗',
        result.width?.meetsTarget ? '✓' : '✗',
        result.header?.sameRow ? '✓' : '✗',
        result.margins?.meetsTarget ? '✓' : '✗',
      ].join(' ');

      console.log(`  ${channel.name}: ${checks}`);

      if (result.clipping?.clipped) {
        console.log(`    ⚠ Clipping detected: ${result.clipping.scrollHeight}>${result.clipping.clientHeight} or ${result.clipping.scrollWidth}>${result.clipping.clientWidth}`);
      }
      if (!result.width?.meetsTarget) {
        console.log(`    ⚠ Width ${result.width?.percentage?.toFixed(1)}% < 92%`);
      }
      if (!result.header?.sameRow) {
        console.log(`    ⚠ Header not aligned: max diff ${result.header?.maxDiff}px`);
      }
      if (!result.margins?.meetsTarget) {
        console.log(`    ⚠ Margins: left=${result.margins?.leftMargin}px, right=${result.margins?.rightMargin}px`);
      }
    }

    await context.close();
  }

  // Take comparison screenshots at 1440×900 for Hello, Experience, Contact
  console.log('\n\n=== SCREENSHOTS (1440×900) ===\n');
  const screenshotChannels = [channels[0], channels[3], channels[6]]; // Hello, Experience, Contact
  const viewport = { width: 1440, height: 900 };
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();

  for (const channel of screenshotChannels) {
    console.log(`${channel.name}:`);
    const proto = await captureComparison(page, PROTO_URL, channel, 'prototype');
    const next = await captureComparison(page, NEXT_URL, channel, 'nextjs');
    console.log(`  - ${proto}`);
    console.log(`  - ${next}`);
  }

  await context.close();
  await browser.close();

  console.log(`\n✓ All screenshots saved to ${OUTPUT_DIR}/`);

  // Summary
  const failures = results.filter(r =>
    r.clipping?.clipped ||
    !r.width?.meetsTarget ||
    !r.header?.sameRow ||
    !r.margins?.meetsTarget
  );

  if (failures.length > 0) {
    console.log(`\n⚠ ${failures.length} checks failed`);
    process.exit(1);
  } else {
    console.log('\n✓ All checks passed');
  }
}

main().catch(console.error);
