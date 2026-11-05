import { chromium } from '@playwright/test';
import { mkdir } from 'fs/promises';
import { join } from 'path';

const VIEWPORT = { width: 1440, height: 900 };
const PROTOTYPE_URL = 'http://localhost:5173';
const NEXTJS_URL = 'http://localhost:3000';
const OUTPUT_DIR = 'screenshots/channel-comparison';

const channels = [
  { number: 1, name: 'Hello', selector: 'button[aria-label*="channel 01"]' },
  { number: 2, name: 'How I think', selector: 'button[aria-label*="channel 02"]' },
  { number: 3, name: 'Building blocks', selector: 'button[aria-label*="channel 03"]' },
  { number: 4, name: 'Experience', selector: 'button[aria-label*="channel 04"]' },
  { number: 5, name: 'Projects', selector: 'button[aria-label*="channel 05"]' },
  { number: 6, name: 'Off the clock', selector: 'button[aria-label*="channel 06"]' },
  { number: 7, name: 'Contact', selector: 'button[aria-label*="channel 07"]' },
];

async function captureChannel(page, url, channel, prefix) {
  await page.goto(url);
  await page.waitForLoadState('networkidle');

  // Wait a bit for animations to settle
  await page.waitForTimeout(1000);

  // Click the channel button
  await page.click(channel.selector);

  // Wait for channel transition
  await page.waitForTimeout(1500);

  const filename = `channel-${String(channel.number).padStart(2, '0')}-${prefix}.png`;
  const filepath = join(OUTPUT_DIR, filename);

  await page.screenshot({ path: filepath, fullPage: false });
  console.log(`✓ Captured ${filename}`);

  return filepath;
}

async function main() {
  // Create output directory
  await mkdir(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: VIEWPORT });

  console.log('Taking screenshots at 1440×900...\n');

  for (const channel of channels) {
    console.log(`Channel ${channel.number}: ${channel.name}`);

    const prototypePage = await context.newPage();
    await captureChannel(prototypePage, PROTOTYPE_URL, channel, 'prototype');
    await prototypePage.close();

    const nextjsPage = await context.newPage();
    await captureChannel(nextjsPage, NEXTJS_URL, channel, 'nextjs');
    await nextjsPage.close();

    console.log('');
  }

  await browser.close();

  console.log(`\nAll screenshots saved to ${OUTPUT_DIR}/`);
  console.log('\nCompare pairs:');
  channels.forEach(ch => {
    const num = String(ch.number).padStart(2, '0');
    console.log(`  ${ch.name}:`);
    console.log(`    - channel-${num}-prototype.png`);
    console.log(`    - channel-${num}-nextjs.png`);
  });
}

main().catch(console.error);
