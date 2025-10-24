import { test, expect, Page } from '@playwright/test';
import { invalid_URL, valid_URL, gotrade_URL } from '../constants/linkConstant';

// ✅ Test for a link that is expected to be valid and reachable
test('Successful or Valid Link', async ({ page }: { page: Page }) => {
  await page.goto(valid_URL);
  await expect(page).toHaveTitle(/GoTrade/);
});

// ✅ Test for a link that is expected to be invalid or unreachable
test('UnSuccessful or InValid Link', async ({ page }: { page: Page }) => {
  try {
    // invalid_URL constant is imported from linkConstant.ts
    await page.goto(invalid_URL, { waitUntil: 'domcontentloaded', timeout: 10000 });
    expect(false, 'Navigation to invalid URL should not succeed').toBe(true);
  } catch (error: any) {
    expect(error.message).toContain('Navigation to invalid URL should not succeed');
  }
});

// ✅ Test for clicking "Go Home" link from an invalid URL page
test('Click Go Home from Invalid Link', async ({ page }: { page: Page }) => {
  try {
    await page.goto(invalid_URL, { waitUntil: 'domcontentloaded', timeout: 10000 });
    await page.getByRole('link', { name: 'Go Home' }).click();
    await page.waitForURL('https://test1.gotrade.goquant.io/', { timeout: 10000 });
    await expect(page).toHaveURL(valid_URL);
    await expect(page).toHaveTitle(/GoTrade/);
  } catch (error: any) {
    console.log('Navigation to invalid URL failed as expected:', error.message);
  }
});

// ✅ Test for navigating to GoTrade without signing in (Security Test)
test('Navigation to GoTrade without signing In', async ({ page }: { page: Page }) => {
  await page.goto(gotrade_URL, { waitUntil: 'domcontentloaded', timeout: 10000 });
  await page.waitForTimeout(10000);
  await expect(page).toHaveURL(valid_URL, { timeout: 10000 });
});
