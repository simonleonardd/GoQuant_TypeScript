import { expect, test, Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { valid_UserEmail, valid_Password } from '../constants/loginConstant';
import { goMarketLocators } from '../locators/goMarketLocators';
import { valid_URL, gotrade_URL, goMarket_URL} from '../constants/linkConstant';
import { compareScreenshot } from '../common_functions/compareScreenshot';

test.beforeEach(async ({ page }: { page: Page }): Promise<void> => {
  await page.goto(valid_URL);
  const loginPage = new LoginPage(page);
  await loginPage.login(valid_UserEmail, valid_Password);
});

// Test for choosing BCHUSDT from exchanges in GoMarket
test('Choose BCHUSDT from exchanges', async ({ page }: { page: Page }): Promise<void> => {
  await expect(page).toHaveURL(gotrade_URL, { timeout: 3000 });
  await page.goto(goMarket_URL, { timeout: 6000 });
  const marketDataPopup = page.locator(goMarketLocators.goMarketDataPopup);
  console.log('Popup count:', await marketDataPopup.count());
  try {
    // Wait up to 10s for the popup to appear in DOM (even if invisible)
    await marketDataPopup.first().waitFor({ state: 'attached', timeout: 10000 });
    // Once it appears, wait for it to become visible
    await marketDataPopup.first().waitFor({ state: 'visible', timeout: 5000 });
    await marketDataPopup.first().click({ force: true });
    console.log('✅ Popup found and clicked.');
  } catch {
    console.log('ℹ️ Popup did not appear — continuing test.');
  }
  await page.waitForTimeout(5000);
  const dropdown = page.locator(goMarketLocators.symbolsDropdown);
  await dropdown.waitFor({ state: 'visible', timeout: 5000 });
  await dropdown.click();
  const searchSymbol = page.getByPlaceholder(goMarketLocators.searchSymbolInput);
  await searchSymbol.waitFor({ state: 'visible', timeout: 5000 });
  await searchSymbol.fill('BCHUSDT');
  const symbolOption = page.locator(goMarketLocators.symbolOption('BCHUSDT'));
  await symbolOption.waitFor({ state: 'visible', timeout: 5000 });
  await symbolOption.click();
  const selectedSymbol = page.locator(goMarketLocators.selectedSymbol('BCHUSDT'));
  await expect(selectedSymbol).toBeVisible();
});

// Adding a symbol to the chart
test('Add new symbol', async ({ page }: { page: Page }): Promise<void> => {
  await expect(page).toHaveURL(gotrade_URL, { timeout: 5000 });
  await page.goto(goMarket_URL, { timeout: 6000 });

  const marketDataPopup = page.locator(goMarketLocators.goMarketDataPopup);
  await page.waitForTimeout(2000);
  if ((await marketDataPopup.count()) > 0) {
    await marketDataPopup.waitFor({ state: 'visible', timeout: 5000 });
    await marketDataPopup.click({ force: true });
  }

  await page.locator(goMarketLocators.selectedSymbol('Add')).click();
  await page.locator(goMarketLocators.selectedSymbol('BCHUSDT')).click();

  const chart = page.locator('.min-w-fit');
  const diffPixels = await compareScreenshot(chart, 'screenshots/gomarket_add_symbol.png', { threshold: 1});
  expect(diffPixels).toBe(0);
});

// // After enabling discovery mode, verify symbols in dropdown
test('Enabling discovery mode and viewing symbols in dropdown', async ({ page }: { page: Page }): Promise<void> => {
  await expect(page).toHaveURL(gotrade_URL, { timeout: 5000 });
  await page.goto(goMarket_URL, { timeout: 6000 });

  const marketDataPopup = page.locator(goMarketLocators.goMarketDataPopup);
  await page.waitForTimeout(2000);
  if ((await marketDataPopup.count()) > 0) {
    await marketDataPopup.waitFor({ state: 'visible', timeout: 5000 });
    await marketDataPopup.click({ force: true });
  }
  await page.getByLabel('Discovery Mode').click();
  const discovery = page.locator(goMarketLocators.symbolDiscovery);
  await discovery.waitFor({ state: 'visible', timeout: 5000 });
  await discovery.click();
  const chart = page.locator(goMarketLocators.discoveryModeToggle);
  await chart.waitFor({ state: 'visible', timeout: 5000 });
  await page.waitForTimeout(500);
  await expect(chart).toBeVisible();
  const diffPixels = await compareScreenshot(chart, 'screenshots/gomarket_discovery_mode.png', { threshold: 1});
  expect(diffPixels).toBe(0);
});
