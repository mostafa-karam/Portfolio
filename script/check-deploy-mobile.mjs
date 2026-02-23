import fs from 'fs';
import { chromium, devices } from 'playwright';

(async () => {
    const url = 'https://mostafa-karam-portfolio.vercel.app/';
    const browser = await chromium.launch({ args: ['--no-sandbox'] });
    const deviceNames = ['iPhone 12', 'Pixel 4'];
    const allLogs = {};

    try {
        for (const name of deviceNames) {
            const device = devices[name];
            const context = await browser.newContext({ ...device });
            const page = await context.newPage();
            const logs = [];
            page.on('console', (msg) => logs.push({ type: 'console', level: msg.type(), text: msg.text() }));
            page.on('pageerror', (err) => logs.push({ type: 'pageerror', text: err.message }));
            page.on('response', (res) => logs.push({ type: 'response', url: res.url(), status: res.status() }));

            try {
                await page.goto(url, { waitUntil: 'networkidle' });
                await page.screenshot({ path: `deploy-screenshot-${name.replace(/\s+/g, '-')}.png`, fullPage: true });
            } catch (err) {
                logs.push({ type: 'navigation-error', text: String(err) });
            }

            allLogs[name] = logs;
            await context.close();
        }
    } finally {
        await browser.close();
        fs.writeFileSync('deploy-mobile-console.json', JSON.stringify(allLogs, null, 2));
        console.log('Wrote deploy-mobile-console.json and screenshots');
    }
})();
