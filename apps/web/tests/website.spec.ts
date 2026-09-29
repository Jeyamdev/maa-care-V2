import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const zero = [0,0,3,0,3,3,3,3,3,3];
async function begin(page: Page) {
  await page.goto('/');
  await page.getByRole('button', { name: 'மதிப்பீட்டைத் தொடங்கு' }).click();
  await page.getByRole('button', { name: 'மதிப்பீட்டைத் தொடங்கு' }).click();
}
async function answer(page: Page, answers: number[]) {
  for (let i=0;i<10;i++) {
    await page.getByRole('radio').nth(answers[i]).check();
    await page.getByRole('button', { name: i===9 ? 'முடி' : 'அடுத்து', exact: false }).click();
  }
}
test('validation, editing, independent safety, privacy, reset, reload and direct result', async ({ page, context }) => {
  const errors: string[] = [];
  const logs: string[] = [];
  const requests: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => logs.push(message.text()));
  await page.addInitScript(() => {
    const violations: string[] = [];
    (window as any).__privacyViolations = violations;
    Storage.prototype.setItem = function () { violations.push('storage'); throw new Error('Unexpected storage write'); };
    const open = indexedDB.open.bind(indexedDB);
    indexedDB.open = (...args) => { violations.push('indexedDB'); return open(...args); };
    const original = history.pushState.bind(history);
    history.pushState = (state, title, url) => { if (state !== null) violations.push('history state'); original(state, title, url); };
    const replace = history.replaceState.bind(history);
    history.replaceState = (state, title, url) => { if (state !== null) violations.push('history state'); replace(state, title, url); };
  });
  await begin(page);
  page.on('request', request => requests.push(request.url()));
  await page.getByRole('button', { name: 'அடுத்து' }).click();
  await expect(page.getByRole('alert')).toBeFocused();
  await page.getByRole('radio').nth(1).check();
  await page.getByRole('button', { name: 'அடுத்து' }).click();
  await expect(page.getByRole('heading', { name: 'கேள்வி 2 / 10' })).toBeFocused();
  await page.getByRole('button', { name: 'முந்தையது' }).click();
  await expect(page.getByRole('radio').nth(1)).toBeChecked();
  // All remaining scoring and client navigation must work without network.
  await context.setOffline(true);
  await answer(page, [...zero.slice(0,9), 2]);
  await expect(page).toHaveURL('/results');
  await expect(page.locator('.score strong')).toHaveText('1');
  await expect(page.getByText('குறைந்த ஆபத்து', { exact: true })).toBeVisible();
  await expect(page.getByRole('alert')).toBeVisible();
  await page.locator('.answer-details summary').click();
  await expect(page.locator('.answer-details li')).toHaveCount(10);
  expect(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length, cookie: document.cookie, state: history.state, violations: (window as any).__privacyViolations }))).toEqual({ local:0, session:0, cookie:'', state:null, violations:[] });
  expect(await context.cookies()).toEqual([]);
  expect(await page.evaluate(async () => ({ caches: await caches.keys(), workers: (await navigator.serviceWorker.getRegistrations()).length, databases: (await indexedDB.databases()).length }))).toEqual({ caches:[], workers:0, databases:0 });
  expect(requests).toEqual([]);
  expect(errors).toEqual([]);
  expect(logs).toEqual([]);
  await expect(page.locator('.resources a')).toHaveAttribute('href', 'https://youtube.com/@maacareapp?si=YayFCeB1kEKiP-lo');
  await page.getByRole('button', { name: 'புதிய மதிப்பீட்டைத் தொடங்கு' }).click();
  await page.goBack();
  await expect(page.getByRole('heading', { name: 'முழுமையான பதில்கள் தேவை' })).toBeVisible();
  await context.setOffline(false);
  await begin(page); await answer(page, zero);
  await page.reload();
  await expect(page.getByRole('heading', { name: 'முழுமையான பதில்கள் தேவை' })).toBeVisible();
  await begin(page); await answer(page, zero);
  await page.getByRole('button', { name: 'முகப்புக்குச் செல்' }).click();
  await page.goBack();
  await expect(page.getByRole('heading', { name: 'முழுமையான பதில்கள் தேவை' })).toBeVisible();
  await page.goto('/results');
  await expect(page.getByRole('heading', { name: 'முழுமையான பதில்கள் தேவை' })).toBeVisible();
  expect(errors).toEqual([]);
});
test('all risk boundaries render with original labels', async ({ page }) => {
  for (const total of [0,9,10,12,13,30]) {
    await begin(page);
    let remaining=total;
    const answers=zero.map((value) => { const score=Math.min(remaining,3); remaining-=score; return value===0 ? score : 3-score; });
    await answer(page, answers);
    await expect(page.locator('.score strong')).toHaveText(String(total));
    await expect(page.locator('.status')).toHaveText(total<=9 ? 'குறைந்த ஆபத்து' : total<=12 ? 'மிதமான ஆபத்து' : 'அதிக ஆபத்து');
  }
});
test('keyboard, focus and accessible pages', async ({ page }) => {
  await begin(page);
  await page.keyboard.press('Tab');
  await expect(page.getByRole('radio').first()).toBeFocused();
  await page.keyboard.press('Space');
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('radio').nth(1)).toBeChecked();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name:'அடுத்து' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { name:'கேள்வி 2 / 10' })).toBeFocused();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await begin(page); await answer(page,[...zero.slice(0,9),2]);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  for (const route of ['/', '/guide', '/about', '/results']) {
    await page.goto(route);
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  }
});
test('responsive Tamil layouts and enlarged text do not overflow', async ({ page }) => {
  for (const width of [320,390,768,1440]) {
    await page.setViewportSize({ width, height:900 });
    for (const route of ['/', '/guide', '/about']) {
      await page.goto(route);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.screenshot({ path:`../../output/web-review/${width}-${route==='/'?'home':route.slice(1)}.png`, fullPage:true });
    }
    await begin(page);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path:`../../output/web-review/${width}-assessment.png`, fullPage:true });
    await answer(page,[...zero.slice(0,9),2]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path:`../../output/web-review/${width}-results.png`, fullPage:true });
  }
  // 1280px browser at 200% zoom has a 640px CSS layout viewport.
  await page.setViewportSize({ width:640, height:450 });
  await page.goto('/');
  await page.evaluate(() => document.documentElement.style.fontSize='200%');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path:'../../output/web-review/enlarged-home.png', fullPage:true });
  await page.getByRole('button', { name:'மதிப்பீட்டைத் தொடங்கு' }).click();
  await page.getByRole('button', { name:'மதிப்பீட்டைத் தொடங்கு' }).click();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
