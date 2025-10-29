import { test, expect, BrowserContext, Page } from '@playwright/test';
import { valid_URL, gotrade_URL } from '../constants/linkConstant';
import { valid_UserEmail, valid_Password } from '../constants/loginConstant';
import { LoginPage } from '../pages/loginPage';
import { compareScreenshot } from '../common_functions/compareScreenshot';
import { gotradeLocators } from '../locators/gotradeLocators';
import { loginLocators } from '../locators/loginLocators';

const RUN_COUNT = 50;

for (let i = 1; i <= RUN_COUNT; i++) {
  test(`Run #${i} - Buying a BTC-USDT-SWAP in MarketEdge`, async ({ page }: { page: Page }) => {
    console.log(`🚀 Starting iteration ${i}`);

    // Login
    await page.goto(valid_URL);
    const loginPage = new LoginPage(page);
    await loginPage.login(valid_UserEmail, valid_Password);

    // Verify URL
    await expect(page).toHaveURL(gotrade_URL, { timeout: 5000 });

    // Handle popup
    const welcomePopup = page.locator(gotradeLocators.onBoardingCard);
    try {
      await welcomePopup.first().waitFor({ state: 'attached', timeout: 5000 });
      await welcomePopup.first().waitFor({ state: 'visible', timeout: 5000 });
      await page.locator(gotradeLocators.onBoardingCardProceedSymbol).click();
      console.log(`✅ Popup found and clicked in iteration ${i}.`);
    } catch {
      console.log(`ℹ️ Popup did not appear in iteration ${i}.`);
    }

    // Fill order fields
    await page.locator(gotradeLocators.quantityInput).fill('1');
    await page.locator(gotradeLocators.durationInput).fill('5');
    await page.locator(gotradeLocators.tradeButton).click();

    // Check toast
    const toast = page.getByRole('listitem').filter({ hasText: 'Order Accepted' });
    await toast.waitFor({ state: 'visible' });

    // Compare screenshots
    const diffPixels = await compareScreenshot(toast, 'screenshots/gotradeAccepted.png', { threshold: 1 });
    expect(diffPixels).toBe(0);

    console.log(`✅ Completed iteration ${i}`);
  });
}


test('Run same test in multiple tabs', async ({ browser }) => {
  const context: BrowserContext = await browser.newContext();

  // Number of tabs you want to run
  const tabCount = 3;

  // Create multiple tabs
  const tabs: Page[] = await Promise.all(
    Array.from({ length: tabCount }, () => context.newPage())
  );

  // Run same actions in all tabs concurrently
  await Promise.all(
    tabs.map(async (page, index) => {
      console.log(`🪟 Tab ${index + 1} starting...`);

      await page.goto(valid_URL);

      // Example login or action
      await page.fill(loginLocators.userEmailInput, valid_UserEmail);
      await page.fill(loginLocators.userPasswordInput, valid_Password);
      await page.click('button[type="submit"]');

      await expect(page).toHaveURL(gotrade_URL);

      console.log(`✅ Tab ${index + 1} completed`);
    })
  );

  // Optional: close the browser context after all are done
  await context.close();
});

