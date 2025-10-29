import { expect, test, Page } from '@playwright/test';
import { valid_URL, gotrade_URL } from '../constants/linkConstant';
import { valid_UserEmail, valid_Password } from '../constants/loginConstant';
import { LoginPage } from '../pages/loginPage';
import { compareScreenshot } from '../common_functions/compareScreenshot';
import { tradeConfigs } from '../DataSet/goTrade_Dataset';
import { gotradeLocators } from '../locators/gotradeLocators';

// -------- Common Before Each --------
test.beforeEach(async ({ page }: { page: Page }) => {
  await page.goto(valid_URL);
  const loginPage = new LoginPage(page);
  await loginPage.login(valid_UserEmail, valid_Password);
});

// -------- Common Helper: Handle Popup --------
async function handleWelcomePopup(page: Page) {
  const welcomePopup = page.locator(gotradeLocators.onBoardingCard);
  try {
    await welcomePopup.first().waitFor({ state: 'attached', timeout: 5000 });
    await welcomePopup.first().waitFor({ state: 'visible', timeout: 5000 });
    await page.locator(gotradeLocators.onBoardingCardProceedSymbol).click();
    console.log('✅ Popup found and clicked.');
  } catch {
    console.log('ℹ️ Popup did not appear — continuing test.');
  }
  await page.waitForTimeout(5000);
}

// -------- Parameterized Tests --------
test.describe('GoTrade Parameterized Order Tests for long operation in OKX', () => {
  for (const config of tradeConfigs) {
    test(`Long BTC-USDT-SWAP in ${config.name}`, async ({ page }: { page: Page }) => {
      await expect(page).toHaveURL(gotrade_URL, { timeout: 5000 });
      await handleWelcomePopup(page);

      // Click order type buttons
      if (config.orderTypeButton) {
        if (Array.isArray(config.orderTypeButton)) {
          for (const button of config.orderTypeButton) {
            await page.locator(button).click();
          }
        } else {
          await page.locator(config.orderTypeButton).click();
        }
      }

      // Fill fields
      for (const field of config.fields) {
        await page.locator(field.selector).fill(field.value);
      }

      // Optional extra step
      if (config.extraStep) {
        await config.extraStep(page);
      }

      // Place order
      await page.locator(gotradeLocators.tradeButton).click();
      await page.waitForTimeout(3000);

      // Wait for toast and compare screenshot
      const toast = page.getByRole('listitem').filter({ hasText: 'Order Accepted' });
      await toast.waitFor({ state: 'visible' });

      const diffPixels = await compareScreenshot(toast, config.screenshotPath, { threshold: 1 });
      expect(diffPixels).toBe(0);
    });
  }
});

test.describe('GoTrade Parameterized Order Tests for short operation in OKX', () => {
  const filteredConfigs = tradeConfigs.filter(c => c.name !== 'Target Position');

  for (const config of filteredConfigs) {
    test(`Short BTC-USDT-SWAP in ${config.name}`, async ({ page }: { page: Page }) => {
      await expect(page).toHaveURL(gotrade_URL, { timeout: 5000 });
      await handleWelcomePopup(page);

      // Click order type buttons
      if (config.orderTypeButton) {
        if (Array.isArray(config.orderTypeButton)) {
          for (const button of config.orderTypeButton) {
            await page.locator(button).click();
          }
        } else {
          await page.locator(config.orderTypeButton).click();
        }
      }

      // Fill fields
      for (const field of config.fields) {
        await page.locator(field.selector).fill(field.value);
      }

      // Optional extra step
      if (config.extraStep) {
        await config.extraStep(page);
      }

      // Place order
      await page.locator(gotradeLocators.shortorsellButton).click();
      await page.locator(gotradeLocators.tradeButton).click();
      await page.waitForTimeout(3000);

      // Wait for toast and compare screenshot
      const toast = page.getByRole('listitem').filter({ hasText: 'Order Accepted' });
      await toast.waitFor({ state: 'visible' });

      const diffPixels = await compareScreenshot(toast, config.screenshotPath, { threshold: 1 });
      expect(diffPixels).toBe(0);
    });
  }
});

test.describe('GoTrade Parameterized Order Tests for BUY operation in Binance USD-M', () => {
    
  for (const config of tradeConfigs) {
    test(`Long BTC-USDT in ${config.name}`, async ({ page }: { page: Page }) => {
      await expect(page).toHaveURL(gotrade_URL, { timeout: 5000 });
      await handleWelcomePopup(page);

      await page.locator(gotradeLocators.exchangeSelector).click();
      await page.locator(gotradeLocators.usdmexchangeSelector).click();
      if(!page.locator(gotradeLocators.viewExchanges)){
      await page.locator(gotradeLocators.usdmAccountSelection).click();
       }
      // Click order type buttons
      if (config.orderTypeButton) {
        if (Array.isArray(config.orderTypeButton)) {
          for (const button of config.orderTypeButton) {
            await page.locator(button).click();
          }
        } else {
          await page.locator(config.orderTypeButton).click();
        }
      }

      // Fill fields
      for (const field of config.fields) {
        await page.locator(field.selector).fill(field.value);
      }

      // Optional extra step
      if (config.extraStep) {
        await config.extraStep(page);
      }

      // Place order
      await page.locator(gotradeLocators.tradeButton).click();
      await page.waitForTimeout(3000);

      // Wait for toast and compare screenshot
      const toast = page.getByRole('listitem').filter({ hasText: 'Order Accepted' });
      await toast.waitFor({ state: 'visible' });

      const diffPixels = await compareScreenshot(toast, config.screenshotPath, { threshold: 1 });
      expect(diffPixels).toBe(0);
    });
  }
});

test.describe('GoTrade Parameterized Order Tests for SELL operation in Binance USD-M', () => {
  const filteredConfigs = tradeConfigs.filter(c => c.name !== 'Target Position');

  for (const config of filteredConfigs) {
    test(`Short BTC-USDT in ${config.name}`, async ({ page }: { page: Page }) => {
      await expect(page).toHaveURL(gotrade_URL, { timeout: 5000 });
      await handleWelcomePopup(page);

      await page.locator(gotradeLocators.exchangeSelector).click();
      await page.locator(gotradeLocators.usdmexchangeSelector).click();
      if(!page.locator(gotradeLocators.viewExchanges)){
        await page.locator(gotradeLocators.usdmAccountSelection).click();
       }

      // Click order type buttons
      if (config.orderTypeButton) {
        if (Array.isArray(config.orderTypeButton)) {
          for (const button of config.orderTypeButton) {
            await page.locator(button).click();
          }
        } else {
          await page.locator(config.orderTypeButton).click();
        }
      }

      // Fill fields
      for (const field of config.fields) {
        await page.locator(field.selector).fill(field.value);
      }

      // Optional extra step
      if (config.extraStep) {
        await config.extraStep(page);
      }

      // Place order
      await page.locator(gotradeLocators.shortorsellButton).click();
      await page.locator(gotradeLocators.tradeButton).click();
      await page.waitForTimeout(3000);

      // Wait for toast and compare screenshot
      const toast = page.getByRole('listitem').filter({ hasText: 'Order Accepted' });
      await toast.waitFor({ state: 'visible' });

      const diffPixels = await compareScreenshot(toast, config.screenshotPath, { threshold: 1 });
      expect(diffPixels).toBe(0);
    });
  }
});

test.describe('GoTrade Parameterized Order Tests for BUY operation in Binance COIN-M', () => {
    
  for (const config of tradeConfigs) {
    test(`Long BTCUSD_PERP in ${config.name}`, async ({ page }: { page: Page }) => {
      await expect(page).toHaveURL(gotrade_URL, { timeout: 5000 });
      await handleWelcomePopup(page);

      await page.locator(gotradeLocators.exchangeSelector).click();
      await page.locator(gotradeLocators.coinmexchangeSelector).click();
      if(!page.locator(gotradeLocators.viewExchanges)){
      await page.locator(gotradeLocators.coinmAccountSelection).click();
       }
      // Click order type buttons
      if (config.orderTypeButton) {
        if (Array.isArray(config.orderTypeButton)) {
          for (const button of config.orderTypeButton) {
            await page.locator(button).click();
          }
        } else {
          await page.locator(config.orderTypeButton).click();
        }
      }

      // Fill fields
      for (const field of config.fields) {
        await page.locator(field.selector).fill(field.value);
      }

      // Optional extra step
      if (config.extraStep) {
        await config.extraStep(page);
      }

      // Place order
      await page.locator(gotradeLocators.tradeButton).click();
      await page.waitForTimeout(3000);

      // Wait for toast and compare screenshot
      const toast = page.getByRole('listitem').filter({ hasText: 'Order Accepted' });
      await toast.waitFor({ state: 'visible' });

      const diffPixels = await compareScreenshot(toast, config.screenshotPath, { threshold: 1 });
      expect(diffPixels).toBe(0);
    });
  }
});

test.describe('GoTrade Parameterized Order Tests for SELL operation in Binance USD-M', () => {
  const filteredConfigs = tradeConfigs.filter(c => c.name !== 'Target Position');

  for (const config of filteredConfigs) {
    test(`Short BTCUSD_PERP in ${config.name}`, async ({ page }: { page: Page }) => {
      await expect(page).toHaveURL(gotrade_URL, { timeout: 5000 });
      await handleWelcomePopup(page);

      await page.locator(gotradeLocators.exchangeSelector).click();
      await page.locator(gotradeLocators.coinmexchangeSelector).click();
      if(!page.locator(gotradeLocators.viewExchanges)){
        await page.locator(gotradeLocators.coinmAccountSelection).click();
       }

      // Click order type buttons
      if (config.orderTypeButton) {
        if (Array.isArray(config.orderTypeButton)) {
          for (const button of config.orderTypeButton) {
            await page.locator(button).click();
          }
        } else {
          await page.locator(config.orderTypeButton).click();
        }
      }

      // Fill fields
      for (const field of config.fields) {
        await page.locator(field.selector).fill(field.value);
      }

      // Optional extra step
      if (config.extraStep) {
        await config.extraStep(page);
      }

      // Place order
      await page.locator(gotradeLocators.shortorsellButton).click();
      await page.locator(gotradeLocators.tradeButton).click();
      await page.waitForTimeout(3000);

      // Wait for toast and compare screenshot
      const toast = page.getByRole('listitem').filter({ hasText: 'Order Accepted' });
      await toast.waitFor({ state: 'visible' });

      const diffPixels = await compareScreenshot(toast, config.screenshotPath, { threshold: 1 });
      expect(diffPixels).toBe(0);
    });
  }
});

test('Placing a trade with empty values', async({ page }: { page: Page }): Promise<void> => {
  await expect(page).toHaveURL(gotrade_URL, { timeout: 5000 });
  await handleWelcomePopup(page);
  await page.locator(gotradeLocators.tradeButton).click();

  const quantityWarning = page.locator('//p[contains(text(), "Quantity must be greater than 0")]');
  expect(quantityWarning).toContainText("Quantity must be greater than 0");
  const durationWarning = page.locator('//p[contains(text(), "Duration must be greater than 0")]');
  expect(durationWarning).toContainText("Duration must be greater than 0");

});

test('Showing execution profile', async({ page }: { page: Page }): Promise<void> => {
  await expect(page).toHaveURL(gotrade_URL, { timeout: 5000 });
  await handleWelcomePopup(page);

  await page.locator(gotradeLocators.quantityInput).fill('1');
  await page.locator(gotradeLocators.durationInput).fill('10');
  await page.waitForTimeout(5000);
  await page.locator('#showExecutionChart').click();
  await page.waitForTimeout(3000);


  const chart = page.locator(gotradeLocators.executionProfileChart);
  expect(chart).toContainText('Market Edge - Order Execution Profile');
  const diffPixels = await compareScreenshot(chart, 'screenshots/gotrade_ExecutionProfile.png', { threshold: 1 , resizeExisting:false});
  expect(diffPixels).toBe(0);

});

test('Displaying chart', async({ page }: { page: Page }): Promise<void> => {
  await expect(page).toHaveURL(gotrade_URL, { timeout: 5000 });
  await handleWelcomePopup(page);

  await page.locator(gotradeLocators.chart).click();
  const chartCanvas = page.locator('//canvas[contains(@data-zr-dom-id,"zr_0")]');

  const diffPixels = await compareScreenshot(chartCanvas, 'screenshots/gotrade_Chart.png', { threshold: 1 , resizeExisting:false});
  expect(diffPixels).toBe(0);

});

test('Cancelling working orders', async({ page }: { page: Page }): Promise<void> => {
  await expect(page).toHaveURL(gotrade_URL, { timeout: 5000 });
  await handleWelcomePopup(page);

  const cancelButton = page.locator(gotradeLocators.cancelWorkingOrders);
  await cancelButton.scrollIntoViewIfNeeded();
  await cancelButton.click();

  await page.locator(gotradeLocators.cancelConfirmation).click();
  const divsInsideTbody = page.locator('tbody[class*="border-0"] div.group.contents');
  const divCount = await divsInsideTbody.count();

  if (divCount > 0) {
    console.log(`✅ Div elements found inside tbody: ${divCount}`);
  } else {
    console.log('❌ No div elements found inside tbody');
  }
  expect(divCount).toBe(0);
});

test('Kill-Edge', async({ page }: { page: Page }): Promise<void> => {
  await expect(page).toHaveURL(gotrade_URL, { timeout: 5000 });
  await handleWelcomePopup(page);

  const cancelButton = page.locator(gotradeLocators.killEdgeButton);
  await cancelButton.scrollIntoViewIfNeeded();
  await cancelButton.click();

  await page.locator(gotradeLocators.cancelConfirmation).click();
  await page.locator(gotradeLocators.openPositionButton).click();
  await page.locator(gotradeLocators.killEdgeButton).click();
  await expect(page.locator('td')).toHaveText('No Results');

});

test('Liqudate Positions', async({ page }: { page: Page }): Promise<void> => {
  await expect(page).toHaveURL(gotrade_URL, { timeout: 5000 });
  await handleWelcomePopup(page);

  const cancelButton = page.locator(gotradeLocators.liquidatePositions);
  await cancelButton.scrollIntoViewIfNeeded();
  await cancelButton.click();

  await page.locator(gotradeLocators.cancelConfirmation).click();
  await page.locator(gotradeLocators.openPositionButton).click();
  await page.locator(gotradeLocators.killEdgeButton).click();
  await expect(page.locator('td')).toHaveText('No Results');

});