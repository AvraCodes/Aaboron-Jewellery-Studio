import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = '/Users/avra/.gemini/antigravity-ide/brain/98261293-de77-4152-8a72-f5d105c0bdae/scratch/screenshots';
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

const WIDTHS = [320, 360, 390, 430, 768, 1280];
const ROUTES = [
  '/',
  '/shop',
  '/product/clay-set-01',
  '/about',
  '/contact',
  '/custom-orders',
  '/checkout',
  '/care',
  '/shipping'
];

async function run() {
  const browser = await chromium.launch({ headless: true });
  const results = [];

  for (const route of ROUTES) {
    const routeSlug = route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '_');
    for (const width of WIDTHS) {
      const context = await browser.newContext({
        viewport: { width, height: 900 },
        deviceScaleFactor: 2,
        isMobile: width < 768
      });
      const page = await context.newPage();

      try {
        await page.goto(`http://localhost:3000${route}`, { waitUntil: 'load', timeout: 15000 });
        await page.waitForTimeout(1000);

        const screenshotName = `${routeSlug}_${width}px.png`;
        const screenshotPath = path.join(SCREENSHOT_DIR, screenshotName);
        await page.screenshot({ path: screenshotPath, fullPage: false });

        const audit = await page.evaluate(() => {
          const vw = window.innerWidth;
          const docScrollWidth = document.documentElement.scrollWidth;
          const bodyScrollWidth = document.body.scrollWidth;
          const hasOverflow = docScrollWidth > vw + 1 || bodyScrollWidth > vw + 1;

          const allElements = Array.from(document.querySelectorAll('*'));
          const overflowing = [];

          for (const el of allElements) {
            const rect = el.getBoundingClientRect();
            if (rect.right > vw + 1 || rect.left < -1) {
              const tag = el.tagName.toLowerCase();
              const id = el.id ? '#' + el.id : '';
              const classes = typeof el.className === 'string' ? el.className : '';
              const text = (el.innerText || el.textContent || '').trim().slice(0, 50).replace(/\s+/g, ' ');
              overflowing.push({
                tag,
                id,
                className: classes,
                text,
                left: Math.round(rect.left),
                right: Math.round(rect.right),
                width: Math.round(rect.width),
                overflowRight: Math.round(rect.right - vw)
              });
            }
          }

          return {
            vw,
            docScrollWidth,
            bodyScrollWidth,
            hasOverflow,
            overflowing
          };
        });

        results.push({
          route,
          width,
          screenshot: screenshotName,
          ...audit
        });
      } catch (err) {
        results.push({
          route,
          width,
          error: err.message
        });
      } finally {
        await context.close();
      }
    }
  }

  await browser.close();
  fs.writeFileSync(
    '/Users/avra/.gemini/antigravity-ide/brain/98261293-de77-4152-8a72-f5d105c0bdae/scratch/playwright_audit.json',
    JSON.stringify(results, null, 2)
  );
  console.log('Audit completed. Total entries:', results.length);
}

run().catch(console.error);
