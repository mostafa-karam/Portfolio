import fs from 'fs';
import { chromium } from 'playwright';

(async () => {
    const url = 'https://portfolio-seven-bice-78.vercel.app/';
    const browser = await chromium.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    const logs = [];
    page.on('console', (msg) => logs.push({ type: msg.type(), text: msg.text() }));
    page.on('pageerror', (err) => logs.push({ type: 'pageerror', text: err.message }));
    page.on('response', (res) => logs.push({ type: 'response', url: res.url(), status: res.status() }));

    try {
        await page.goto(url, { waitUntil: 'networkidle' });
        await page.screenshot({ path: 'deploy-screenshot.png', fullPage: true });
    } catch (err) {
        logs.push({ type: 'navigation-error', text: String(err) });
    }

    await browser.close();
    fs.writeFileSync('deploy-console.json', JSON.stringify(logs, null, 2));
    console.log('Wrote deploy-screenshot.png and deploy-console.json');
})();
