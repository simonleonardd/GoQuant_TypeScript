import { expect, test, Page } from '@playwright/test';
import { valid_URL, gotrade_URL, admin_URL } from '../constants/linkConstant';
import { valid_UserEmail, valid_Password } from '../constants/loginConstant';
import { LoginPage } from '../pages/loginPage';
import { compareScreenshot } from '../common_functions/compareScreenshot';

test.beforeEach(async ({ page }: { page: Page }): Promise<void> => {
  await page.goto(valid_URL);
  const loginPage = new LoginPage(page);
  await loginPage.login(valid_UserEmail, valid_Password);
});

test('Buying a BTC-USDT-SWAP in MarketEdge', async ({ page }: { page: Page }): Promise<void> => {
  await expect(page).toHaveURL(gotrade_URL, { timeout: 5000 });
  const welcomePopup = page.locator('//div[contains(@data-testid,"onboarding-card")]');
    try {
        // Wait up to 10s for the popup to appear in DOM (even if invisible)
        await welcomePopup.first().waitFor({ state: 'attached', timeout: 5000 });
        // Once it appears, wait for it to become visible
        await welcomePopup.first().waitFor({ state: 'visible', timeout: 5000 });
        await page.locator('//span[contains(text(),"→")]').click();
        console.log('✅ Popup found and clicked.');
    } catch {
        console.log('ℹ️ Popup did not appear — continuing test.');
    }
    await page.waitForTimeout(5000);
    // if (!page.locator('p.ml-4.text-ellipsis', { hasText: 'OKX' })) {
    //   await page.locator('//button[contains(@data-testid,"exchange-selector-trigger")]').click();
    //   await page.locator('//button[contains(@data-testid,"exchange-selector-item-OKX")]').click();
    //   if(!page.locator('//p[contains(text(),"Select exchanges to view the accounts")]')){
    //   await page.locator('//button[contains(@data-testid,"OKX-selector-123www")]').click();
    //    }
    // }
    await page.locator('input[data-testid = "quantity"]').fill('1');
    await page.locator('input[data-testid = "duration"]').fill('5');
    await page.locator('//button[contains(@data-testid,"trade-button")]').click();
    await page.waitForTimeout(3000);
    // const closeToastButton = page.locator('button[aria-label="Close toast"]');
    // await closeToastButton.click();
    const toast = page.getByRole('listitem').filter({ hasText: 'Order Accepted' });
  // Wait until it's visible (important if it's a toast)
    await toast.waitFor({ state: 'visible' });
    const diffPixels = await compareScreenshot(toast, 'screenshots/gotradeOKX_marketEdge_Buy.png', { threshold: 1 });
    expect(diffPixels).toBe(0);
});

test('Buying a BTC-USDT-SWAP in LimitEdge', async ({ page }: { page: Page }): Promise<void> => {
  await expect(page).toHaveURL(gotrade_URL, { timeout: 5000 });
  const welcomePopup = page.locator('//div[contains(@data-testid,"onboarding-card")]');
    try {
        // Wait up to 10s for the popup to appear in DOM (even if invisible)
        await welcomePopup.first().waitFor({ state: 'attached', timeout: 5000 });
        // Once it appears, wait for it to become visible
        await welcomePopup.first().waitFor({ state: 'visible', timeout: 5000 });
        await page.locator('//span[contains(text(),"→")]').click();
        console.log('✅ Popup found and clicked.');
    } catch {
        console.log('ℹ️ Popup did not appear — continuing test.');
    }
    await page.waitForTimeout(5000);
    await page.locator('//button[contains(@data-testid,"GOTRADE_ORDERTYPE_LIMIT_EDGE")]').click();
    // if (!page.locator('p.ml-4.text-ellipsis', { hasText: 'OKX' })) {
    //   await page.locator('//button[contains(@data-testid,"exchange-selector-trigger")]').click();
    //   await page.locator('//button[contains(@data-testid,"exchange-selector-item-OKX")]').click();
    //   if(!page.locator('//p[contains(text(),"Select exchanges to view the accounts")]')){
    //   await page.locator('//button[contains(@data-testid,"OKX-selector-123www")]').click();
    //    }
    // }
    await page.locator('input[data-testid = "quantity"]').fill('1');
    await page.locator('input[data-testid = "duration"]').fill('5');
    await page.locator('input[data-testid = "threshold"]').fill('5');
    await page.locator('//button[contains(@data-testid,"trade-button")]').click();
    await page.waitForTimeout(3000);
    // const closeToastButton = page.locator('button[aria-label="Close toast"]');
    // await closeToastButton.click();
    const toast = page.getByRole('listitem').filter({ hasText: 'Order Accepted' });
  // Wait until it's visible (important if it's a toast)
    await toast.waitFor({ state: 'visible' });
    const diffPixels = await compareScreenshot(toast, 'screenshots/gotradeOKX_MarketEdge_Buy.png', { threshold: 1 });
    expect(diffPixels).toBe(0);
});

test('Buying a BTC-USDT-SWAP in TWAPEdge', async ({ page }: { page: Page }): Promise<void> => {
  await expect(page).toHaveURL(gotrade_URL, { timeout: 5000 });
  const welcomePopup = page.locator('//div[contains(@data-testid,"onboarding-card")]');
    try {
        // Wait up to 10s for the popup to appear in DOM (even if invisible)
        await welcomePopup.first().waitFor({ state: 'attached', timeout: 5000 });
        // Once it appears, wait for it to become visible
        await welcomePopup.first().waitFor({ state: 'visible', timeout: 5000 });
        await page.locator('//span[contains(text(),"→")]').click();
        console.log('✅ Popup found and clicked.');
    } catch {
        console.log('ℹ️ Popup did not appear — continuing test.');
    }
    await page.waitForTimeout(5000);
    await page.locator('//button[contains(@data-testid,"GOTRADE_ORDERTYPE_TWAP_EDGE")]').click();
    // if (!page.locator('p.ml-4.text-ellipsis', { hasText: 'OKX' })) {
    //   await page.locator('//button[contains(@data-testid,"exchange-selector-trigger")]').click();
    //   await page.locator('//button[contains(@data-testid,"exchange-selector-item-OKX")]').click();
    //   if(!page.locator('//p[contains(text(),"Select exchanges to view the accounts")]')){
    //   await page.locator('//button[contains(@data-testid,"OKX-selector-123www")]').click();
    //    }
    // }
    await page.locator('input[data-testid = "quantity"]').fill('1');
    await page.locator('input[data-testid = "duration"]').fill('5');
    await page.locator('input[data-testid = "interval"]').fill('5');
    await page.locator('//button[contains(@data-testid,"trade-button")]').click();
    await page.waitForTimeout(3000);
    // const closeToastButton = page.locator('button[aria-label="Close toast"]');
    // await closeToastButton.click();
    const toast = page.getByRole('listitem').filter({ hasText: 'Order Accepted' });
  // Wait until it's visible (important if it's a toast)
    await toast.waitFor({ state: 'visible' });
    const diffPixels = await compareScreenshot(toast, 'screenshots/gotradeOKX_marketEdge_Buy.png', { threshold: 1 });
    expect(diffPixels).toBe(0);
});

test('Buying a BTC-USDT-SWAP in Limit', async ({ page }: { page: Page }): Promise<void> => {
  await expect(page).toHaveURL(gotrade_URL, { timeout: 5000 });
  const welcomePopup = page.locator('//div[contains(@data-testid,"onboarding-card")]');
    try {
        // Wait up to 10s for the popup to appear in DOM (even if invisible)
        await welcomePopup.first().waitFor({ state: 'attached', timeout: 5000 });
        // Once it appears, wait for it to become visible
        await welcomePopup.first().waitFor({ state: 'visible', timeout: 5000 });
        await page.locator('//span[contains(text(),"→")]').click();
        console.log('✅ Popup found and clicked.');
    } catch {
        console.log('ℹ️ Popup did not appear — continuing test.');
    }
    await page.waitForTimeout(5000);
    await page.locator('//button[contains(@data-testid,"GOTRADE_ORDERTYPE_MORE")]').click();
    await page.locator('//button[contains(@data-testid,"GOTRADE_ORDERTYPE_LIMIT")]').click();

    // if (!page.locator('p.ml-4.text-ellipsis', { hasText: 'OKX' })) {
    //   await page.locator('//button[contains(@data-testid,"exchange-selector-trigger")]').click();
    //   await page.locator('//button[contains(@data-testid,"exchange-selector-item-OKX")]').click();
    //   if(!page.locator('//p[contains(text(),"Select exchanges to view the accounts")]')){
    //   await page.locator('//button[contains(@data-testid,"OKX-selector-123www")]').click();
    //    }
    // }
    await page.locator('input[data-testid = "quantity"]').fill('1');
    await page.locator('input[data-testid = "price"]').fill('114,500.00');
    await page.locator('//button[contains(@data-testid,"trade-button")]').click();
    await page.waitForTimeout(3000);
    // const closeToastButton = page.locator('button[aria-label="Close toast"]');
    // await closeToastButton.click();
    const toast = page.getByRole('listitem').filter({ hasText: 'Order Accepted' });
  // Wait until it's visible (important if it's a toast)
    await toast.waitFor({ state: 'visible' });
    const diffPixels = await compareScreenshot(toast, 'screenshots/gotradeOKX_marketEdge_Buy.png', { threshold: 1 });
    expect(diffPixels).toBe(0);
});

test('Buying a BTC-USDT-SWAP in Market', async ({ page }: { page: Page }): Promise<void> => {
  await expect(page).toHaveURL(gotrade_URL, { timeout: 5000 });
  const welcomePopup = page.locator('//div[contains(@data-testid,"onboarding-card")]');
    try {
        // Wait up to 10s for the popup to appear in DOM (even if invisible)
        await welcomePopup.first().waitFor({ state: 'attached', timeout: 5000 });
        // Once it appears, wait for it to become visible
        await welcomePopup.first().waitFor({ state: 'visible', timeout: 5000 });
        await page.locator('//span[contains(text(),"→")]').click();
        console.log('✅ Popup found and clicked.');
    } catch {
        console.log('ℹ️ Popup did not appear — continuing test.');
    }
    await page.waitForTimeout(5000);
    await page.locator('//button[contains(@data-testid,"GOTRADE_ORDERTYPE_MORE")]').click();
    await page.locator('//button[contains(@data-testid,"GOTRADE_ORDERTYPE_MARKET")]').click();

    // if (!page.locator('p.ml-4.text-ellipsis', { hasText: 'OKX' })) {
    //   await page.locator('//button[contains(@data-testid,"exchange-selector-trigger")]').click();
    //   await page.locator('//button[contains(@data-testid,"exchange-selector-item-OKX")]').click();
    //   if(!page.locator('//p[contains(text(),"Select exchanges to view the accounts")]')){
    //   await page.locator('//button[contains(@data-testid,"OKX-selector-123www")]').click();
    //    }
    // }
    await page.locator('input[data-testid = "quantity"]').fill('1');
    await page.locator('//button[contains(@data-testid,"trade-button")]').click();
    await page.waitForTimeout(3000);
    // const closeToastButton = page.locator('button[aria-label="Close toast"]');
    // await closeToastButton.click();
    const toast = page.getByRole('listitem').filter({ hasText: 'Order Accepted' });
  // Wait until it's visible (important if it's a toast)
    await toast.waitFor({ state: 'visible' });
    const diffPixels = await compareScreenshot(toast, 'screenshots/gotradeOKX_marketEdge_Buy.png', { threshold: 1 });
    expect(diffPixels).toBe(0);
});

test('Buying a BTC-USDT-SWAP in TWAP', async ({ page }: { page: Page }): Promise<void> => {
  await expect(page).toHaveURL(gotrade_URL, { timeout: 5000 });
  const welcomePopup = page.locator('//div[contains(@data-testid,"onboarding-card")]');
    try {
        // Wait up to 10s for the popup to appear in DOM (even if invisible)
        await welcomePopup.first().waitFor({ state: 'attached', timeout: 5000 });
        // Once it appears, wait for it to become visible
        await welcomePopup.first().waitFor({ state: 'visible', timeout: 5000 });
        await page.locator('//span[contains(text(),"→")]').click();
        console.log('✅ Popup found and clicked.');
    } catch {
        console.log('ℹ️ Popup did not appear — continuing test.');
    }
    await page.waitForTimeout(5000);
    await page.locator('//button[contains(@data-testid,"GOTRADE_ORDERTYPE_MORE")]').click();
    await page.locator('//button[contains(@data-testid,"GOTRADE_ORDERTYPE_TWAP")]').click();

    // if (!page.locator('p.ml-4.text-ellipsis', { hasText: 'OKX' })) {
    //   await page.locator('//button[contains(@data-testid,"exchange-selector-trigger")]').click();
    //   await page.locator('//button[contains(@data-testid,"exchange-selector-item-OKX")]').click();
    //   if(!page.locator('//p[contains(text(),"Select exchanges to view the accounts")]')){
    //   await page.locator('//button[contains(@data-testid,"OKX-selector-123www")]').click();
    //    }
    // }
    await page.locator('input[data-testid = "quantity"]').fill('1');
    await page.locator('input[data-testid = "duration"]').fill('5');
    await page.locator('input[data-testid = "interval"]').fill('5');
    await page.locator('//button[contains(@data-testid,"trade-button")]').click();
    await page.waitForTimeout(3000);
    // const closeToastButton = page.locator('button[aria-label="Close toast"]');
    // await closeToastButton.click();
    const toast = page.getByRole('listitem').filter({ hasText: 'Order Accepted' });
  // Wait until it's visible (important if it's a toast)
    await toast.waitFor({ state: 'visible' });
    const diffPixels = await compareScreenshot(toast, 'screenshots/gotradeOKX_marketEdge_Buy.png', { threshold: 1 });
    expect(diffPixels).toBe(0);
});

test('Buying a BTC-USDT-SWAP in VWAP', async ({ page }: { page: Page }): Promise<void> => {
  await expect(page).toHaveURL(gotrade_URL, { timeout: 5000 });
  const welcomePopup = page.locator('//div[contains(@data-testid,"onboarding-card")]');
    try {
        // Wait up to 10s for the popup to appear in DOM (even if invisible)
        await welcomePopup.first().waitFor({ state: 'attached', timeout: 5000 });
        // Once it appears, wait for it to become visible
        await welcomePopup.first().waitFor({ state: 'visible', timeout: 5000 });
        await page.locator('//span[contains(text(),"→")]').click();
        console.log('✅ Popup found and clicked.');
    } catch {
        console.log('ℹ️ Popup did not appear — continuing test.');
    }
    await page.waitForTimeout(5000);
    await page.locator('//button[contains(@data-testid,"GOTRADE_ORDERTYPE_MORE")]').click();
    await page.locator('//button[contains(@data-testid,"GOTRADE_ORDERTYPE_VWAP")]').click();

    // if (!page.locator('p.ml-4.text-ellipsis', { hasText: 'OKX' })) {
    //   await page.locator('//button[contains(@data-testid,"exchange-selector-trigger")]').click();
    //   await page.locator('//button[contains(@data-testid,"exchange-selector-item-OKX")]').click();
    //   if(!page.locator('//p[contains(text(),"Select exchanges to view the accounts")]')){
    //   await page.locator('//button[contains(@data-testid,"OKX-selector-123www")]').click();
    //    }
    // }
    await page.locator('input[data-testid = "quantity"]').fill('1');
    await page.locator('input[data-testid = "duration"]').fill('5');
    await page.locator('input[name = "participation"]').fill('1');
    await page.locator('//button[contains(@data-testid,"trade-button")]').click();
    await page.waitForTimeout(3000);
    // const closeToastButton = page.locator('button[aria-label="Close toast"]');
    // await closeToastButton.click();
    const toast = page.getByRole('listitem').filter({ hasText: 'Order Accepted' });
  // Wait until it's visible (important if it's a toast)
    await toast.waitFor({ state: 'visible' });
    const diffPixels = await compareScreenshot(toast, 'screenshots/gotradeOKX_marketEdge_Buy.png', { threshold: 1 });
    expect(diffPixels).toBe(0);
});

test('Buying a BTC-USDT-SWAP in Ratio Trade', async ({ page }: { page: Page }): Promise<void> => {
  await expect(page).toHaveURL(gotrade_URL, { timeout: 5000 });
  const welcomePopup = page.locator('//div[contains(@data-testid,"onboarding-card")]');
    try {
        // Wait up to 10s for the popup to appear in DOM (even if invisible)
        await welcomePopup.first().waitFor({ state: 'attached', timeout: 5000 });
        // Once it appears, wait for it to become visible
        await welcomePopup.first().waitFor({ state: 'visible', timeout: 5000 });
        await page.locator('//span[contains(text(),"→")]').click();
        console.log('✅ Popup found and clicked.');
    } catch {
        console.log('ℹ️ Popup did not appear — continuing test.');
    }
    await page.waitForTimeout(5000);
    await page.locator('//button[contains(@data-testid,"GOTRADE_ORDERTYPE_MORE")]').click();
    await page.locator('//button[contains(@data-testid,"GOTRADE_ORDERTYPE_RATIO_TRADE")]').click();

    // if (!page.locator('p.ml-4.text-ellipsis', { hasText: 'OKX' })) {
    //   await page.locator('//button[contains(@data-testid,"exchange-selector-trigger")]').click();
    //   await page.locator('//button[contains(@data-testid,"exchange-selector-item-OKX")]').click();
    //   if(!page.locator('//p[contains(text(),"Select exchanges to view the accounts")]')){
    //   await page.locator('//button[contains(@data-testid,"OKX-selector-123www")]').click();
    //    }
    // }
    await page.locator('input[data-testid = "quantity"]').fill('1');
  //[1]
    await page.locator('//div[contains(@id, "spotSymbolsDropdown")]').click();
    await page.locator('//div[contains(@id, "spotSymbolsDropdown")]').click();
    await page.locator('//button[contains(@data-testid,"trade-button")]').click();
    await page.waitForTimeout(3000);
    // const closeToastButton = page.locator('button[aria-label="Close toast"]');
    // await closeToastButton.click();
    const toast = page.getByRole('listitem').filter({ hasText: 'Order Accepted' });
  // Wait until it's visible (important if it's a toast)
    await toast.waitFor({ state: 'visible' });
    const diffPixels = await compareScreenshot(toast, 'screenshots/gotradeOKX_marketEdge_Buy.png', { threshold: 1 });
    expect(diffPixels).toBe(0);
});

test('Buying a BTC-USDT-SWAP in TARGET_POSITION', async ({ page }: { page: Page }): Promise<void> => {
  await expect(page).toHaveURL(gotrade_URL, { timeout: 5000 });
  const welcomePopup = page.locator('//div[contains(@data-testid,"onboarding-card")]');
    try {
        // Wait up to 10s for the popup to appear in DOM (even if invisible)
        await welcomePopup.first().waitFor({ state: 'attached', timeout: 5000 });
        // Once it appears, wait for it to become visible
        await welcomePopup.first().waitFor({ state: 'visible', timeout: 5000 });
        await page.locator('//span[contains(text(),"→")]').click();
        console.log('✅ Popup found and clicked.');
    } catch {
        console.log('ℹ️ Popup did not appear — continuing test.');
    }
    await page.waitForTimeout(5000);
    await page.locator('//button[contains(@data-testid,"GOTRADE_ORDERTYPE_MORE")]').click();
    await page.locator('//button[contains(@data-testid,"GOTRADE_ORDERTYPE_TARGET_POSITION")]').click();

    // if (!page.locator('p.ml-4.text-ellipsis', { hasText: 'OKX' })) {
    //   await page.locator('//button[contains(@data-testid,"exchange-selector-trigger")]').click();
    //   await page.locator('//button[contains(@data-testid,"exchange-selector-item-OKX")]').click();
    //   if(!page.locator('//p[contains(text(),"Select exchanges to view the accounts")]')){
    //   await page.locator('//button[contains(@data-testid,"OKX-selector-123www")]').click();
    //    }
    // }
    await page.locator('[inputname = "targetPosition"]').fill('5');
    await page.locator('input[data-testid = "duration"]').fill('5');
    await page.locator('//button[contains(@data-testid,"trade-button")]').click();
    await page.waitForTimeout(3000);
    // const closeToastButton = page.locator('button[aria-label="Close toast"]');
    // await closeToastButton.click();
    const toast = page.getByRole('listitem').filter({ hasText: 'Order Accepted' });
  // Wait until it's visible (important if it's a toast)
    await toast.waitFor({ state: 'visible' });
    const diffPixels = await compareScreenshot(toast, 'screenshots/gotradeOKX_marketEdge_Buy.png', { threshold: 1 });
    expect(diffPixels).toBe(0);
});